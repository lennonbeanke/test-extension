param(
  [Parameter(Mandatory = $false)]
  [string]$SiteId,

  [Parameter(Mandatory = $false)]
  [string]$AuthToken = $env:NETLIFY_AUTH_TOKEN
)

$ErrorActionPreference = "Stop"

function Write-Section($title) {
  Write-Host ""
  Write-Host "=== $title ===" -ForegroundColor Cyan
}

function Get-LocalProjectFiles {
  Get-ChildItem -Recurse -File | ForEach-Object {
    "/" + $_.FullName.Substring($PWD.Path.Length + 1).Replace("\", "/")
  }
}

function Get-LocalLinkedFilesFromHtml([string]$htmlPath) {
  if (-not (Test-Path -LiteralPath $htmlPath)) {
    return @()
  }

  $content = Get-Content -LiteralPath $htmlPath -Raw
  $pattern = '(?:href|src)\s*=\s*"([^"]+)"|(?:href|src)\s*=\s*''([^'']+)'''
  $matches = [regex]::Matches($content, $pattern, "IgnoreCase")

  $links = @()
  foreach ($m in $matches) {
    $value = $m.Groups[1].Value
    if ([string]::IsNullOrWhiteSpace($value)) {
      $value = $m.Groups[2].Value
    }
    if ([string]::IsNullOrWhiteSpace($value)) {
      continue
    }
    if ($value -match '^(https?:|mailto:|tel:|#|data:|javascript:)') {
      continue
    }

    if ($value.StartsWith("/")) {
      $links += $value
    } else {
      $links += "/" + $value.TrimStart("./")
    }
  }

  $links | Sort-Object -Unique
}

function Get-RemoteFiles([string]$siteId, [string]$token) {
  $headers = @{ Authorization = "Bearer $token" }
  $url = "https://api.netlify.com/api/v1/sites/$siteId/files"
  $response = Invoke-RestMethod -Headers $headers -Uri $url -Method Get
  $response.PSObject.Properties.Name
}

Write-Section "Local Checks"

$requiredFiles = @(
  "index.html",
  "style.css"
)

$missingRequired = @()
foreach ($file in $requiredFiles) {
  if (-not (Test-Path -LiteralPath $file)) {
    $missingRequired += $file
  }
}

if ($missingRequired.Count -gt 0) {
  Write-Host "Missing required local files:" -ForegroundColor Yellow
  $missingRequired | ForEach-Object { Write-Host "  - $_" -ForegroundColor Yellow }
} else {
  Write-Host "Required local files are present." -ForegroundColor Green
}

$linkedFiles = Get-LocalLinkedFilesFromHtml -htmlPath "index.html"
$linkedMissing = @()
foreach ($linked in $linkedFiles) {
  $localPath = $linked.TrimStart("/").Replace("/", "\")
  if (-not (Test-Path -LiteralPath $localPath)) {
    $linkedMissing += $linked
  }
}

if ($linkedMissing.Count -gt 0) {
  Write-Host "index.html references local files that do not exist:" -ForegroundColor Yellow
  $linkedMissing | ForEach-Object { Write-Host "  - $_" -ForegroundColor Yellow }
} else {
  Write-Host "All local files referenced by index.html exist." -ForegroundColor Green
}

if ([string]::IsNullOrWhiteSpace($SiteId) -or [string]::IsNullOrWhiteSpace($AuthToken)) {
  Write-Section "Remote Checks Skipped"
  Write-Host "To compare deployed files, provide SiteId and NETLIFY_AUTH_TOKEN." -ForegroundColor DarkYellow
  Write-Host "Example:" -ForegroundColor DarkYellow
  Write-Host "  `$env:NETLIFY_AUTH_TOKEN='your_token_here'" -ForegroundColor DarkYellow
  Write-Host "  .\validate-deploy.ps1 -SiteId 'your-site-id'" -ForegroundColor DarkYellow
  exit 0
}

Write-Section "Remote Comparison"

try {
  $localFiles = Get-LocalProjectFiles
  $remoteFiles = Get-RemoteFiles -siteId $SiteId -token $AuthToken

  $missingOnRemote = Compare-Object -ReferenceObject $localFiles -DifferenceObject $remoteFiles |
    Where-Object { $_.SideIndicator -eq "<=" } |
    Select-Object -ExpandProperty InputObject

  $extraOnRemote = Compare-Object -ReferenceObject $localFiles -DifferenceObject $remoteFiles |
    Where-Object { $_.SideIndicator -eq "=>" } |
    Select-Object -ExpandProperty InputObject

  if ($missingOnRemote.Count -eq 0) {
    Write-Host "No local files appear missing from deployed file list." -ForegroundColor Green
  } else {
    Write-Host "Files present locally but not in deployed file list:" -ForegroundColor Yellow
    $missingOnRemote | Sort-Object | ForEach-Object { Write-Host "  - $_" -ForegroundColor Yellow }
  }

  if ($extraOnRemote.Count -gt 0) {
    Write-Host "Files on deploy but not found locally (may be from older deploys/build output):" -ForegroundColor DarkYellow
    $extraOnRemote | Sort-Object | ForEach-Object { Write-Host "  - $_" -ForegroundColor DarkYellow }
  }
}
catch {
  Write-Host "Remote comparison failed: $($_.Exception.Message)" -ForegroundColor Red
  exit 1
}


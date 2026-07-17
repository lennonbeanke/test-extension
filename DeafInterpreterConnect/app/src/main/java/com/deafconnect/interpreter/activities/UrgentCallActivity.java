package com.deafconnect.interpreter.activities;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.deafconnect.interpreter.R;
import com.deafconnect.interpreter.models.CallRequest;
import com.deafconnect.interpreter.utils.FirebaseHelper;
import com.deafconnect.interpreter.utils.LocationHelper;
import com.google.firebase.auth.FirebaseAuth;

/**
 * Lets the user say WHERE the urgent situation is (so an interpreter has
 * context before joining), then broadcasts a request to all online
 * interpreters and waits for one to accept.
 */
public class UrgentCallActivity extends AppCompatActivity {

    private static final int PERMISSION_REQUEST_CODE = 100;
    private static final String[] REQUIRED_PERMISSIONS = {
            Manifest.permission.CAMERA,
            Manifest.permission.RECORD_AUDIO,
            Manifest.permission.ACCESS_FINE_LOCATION
    };

    private FirebaseHelper firebaseHelper;
    private CallRequest activeRequest;
    private String selectedPlaceType = "Other";

    private TextView statusText;
    private ProgressBar connectingSpinner;
    private Button cancelButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_urgent_call);

        firebaseHelper = new FirebaseHelper();
        statusText = findViewById(R.id.tvStatus);
        connectingSpinner = findViewById(R.id.progressConnecting);
        cancelButton = findViewById(R.id.btnCancelRequest);

        connectingSpinner.setVisibility(ProgressBar.GONE);
        cancelButton.setVisibility(Button.GONE);

        setupPlaceButtons();

        cancelButton.setOnClickListener(v -> cancelActiveRequest());

        if (!hasAllPermissions()) {
            ActivityCompat.requestPermissions(this, REQUIRED_PERMISSIONS, PERMISSION_REQUEST_CODE);
        }
    }

    private void setupPlaceButtons() {
        int[] buttonIds = {
                R.id.btnPlaceHospital,
                R.id.btnPlacePolice,
                R.id.btnPlaceGovernment,
                R.id.btnPlaceBank,
                R.id.btnPlaceOther
        };
        String[] labels = {"Hospital", "Police Station", "Government Office", "Bank", "Other"};

        for (int i = 0; i < buttonIds.length; i++) {
            Button b = findViewById(buttonIds[i]);
            String label = labels[i];
            b.setOnClickListener(v -> {
                selectedPlaceType = label;
                startUrgentRequest();
            });
        }
    }

    private void startUrgentRequest() {
        if (!hasAllPermissions()) {
            Toast.makeText(this, "Camera, microphone and location permissions are needed to connect you to an interpreter.", Toast.LENGTH_LONG).show();
            ActivityCompat.requestPermissions(this, REQUIRED_PERMISSIONS, PERMISSION_REQUEST_CODE);
            return;
        }

        setConnectingState(true);

        LocationHelper.getCurrentLocation(this, new LocationHelper.LocationCallback() {
            @Override
            public void onLocationFound(double latitude, double longitude) {
                createRequestAndWait(latitude, longitude);
            }

            @Override
            public void onLocationUnavailable() {
                // Still proceed - location is helpful but not required to connect.
                createRequestAndWait(0.0, 0.0);
            }
        });
    }

    private void createRequestAndWait(double lat, double lng) {
        String userId = FirebaseAuth.getInstance().getCurrentUser() != null
                ? FirebaseAuth.getInstance().getCurrentUser().getUid()
                : "anonymous_user";

        activeRequest = firebaseHelper.createUrgentRequest(userId, selectedPlaceType, lat, lng);
        statusText.setText("Looking for an available interpreter for: " + selectedPlaceType + "...");

        firebaseHelper.listenForAcceptance(activeRequest.getRequestId(), new FirebaseHelper.RequestStatusListener() {
            @Override
            public void onAccepted(String interpreterId, String channelName) {
                runOnUiThread(() -> launchVideoCall(channelName));
            }

            @Override
            public void onDeclinedOrTimeout() {
                runOnUiThread(() -> {
                    setConnectingState(false);
                    Toast.makeText(UrgentCallActivity.this,
                            "No interpreter available right now. Please try again shortly.",
                            Toast.LENGTH_LONG).show();
                });
            }
        });
    }

    private void launchVideoCall(String channelName) {
        setConnectingState(false);
        Intent intent = new Intent(this, VideoCallActivity.class);
        intent.putExtra(VideoCallActivity.EXTRA_CHANNEL_NAME, channelName);
        intent.putExtra(VideoCallActivity.EXTRA_PLACE_TYPE, selectedPlaceType);
        startActivity(intent);
        finish();
    }

    private void cancelActiveRequest() {
        if (activeRequest != null) {
            firebaseHelper.cancelRequest(activeRequest.getRequestId());
            firebaseHelper.stopListening(activeRequest.getRequestId());
        }
        setConnectingState(false);
    }

    private void setConnectingState(boolean connecting) {
        connectingSpinner.setVisibility(connecting ? ProgressBar.VISIBLE : ProgressBar.GONE);
        cancelButton.setVisibility(connecting ? Button.VISIBLE : Button.GONE);
        statusText.setText(connecting ? "Connecting..." : "Choose where you need an interpreter:");
        findViewById(R.id.placeButtonsContainer).setVisibility(connecting ? android.view.View.GONE : android.view.View.VISIBLE);
    }

    private boolean hasAllPermissions() {
        for (String permission : REQUIRED_PERMISSIONS) {
            if (ContextCompat.checkSelfPermission(this, permission) != PackageManager.PERMISSION_GRANTED) {
                return false;
            }
        }
        return true;
    }
}

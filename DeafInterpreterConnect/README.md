# DeafConnect Interpreter

An Android app that lets a deaf user request a **live video call with a sign-language interpreter** with one tap, for urgent situations (hospital, police station, government office, bank, etc.).

## How it works

1. User opens the app and taps the big red **URGENT INTERPRETER CALL** button.
2. They pick where they are (Hospital / Police / Government / Bank / Other).
3. The app grabs their GPS location and creates a call request in Firebase.
4. Any online interpreter (using a separate interpreter-side app or admin console) sees the request and accepts it.
5. Both sides join the same Agora video channel — a live video call starts automatically.
6. When the call ends, it's logged locally so the user can see their call history.

## Project structure

```
app/src/main/java/com/deafconnect/interpreter/
  activities/
    MainActivity.java        - home screen, big urgent call button
    UrgentCallActivity.java  - place selection + waits for interpreter to accept
    VideoCallActivity.java   - the live Agora video call screen
    CallHistoryActivity.java - past calls (stored locally in SQLite)
  models/
    Interpreter.java, CallRequest.java, CallHistoryItem.java
  utils/
    FirebaseHelper.java      - creates/tracks urgent call requests
    LocationHelper.java      - one-time GPS fix
    DatabaseHelper.java      - SQLite call history
```

## Required setup before this runs

### 1. Firebase (matches users to interpreters)
- Go to https://console.firebase.google.com and create a project.
- Add an Android app with package name `com.deafconnect.interpreter`.
- Download the generated `google-services.json` and place it in `app/`.
- Enable **Realtime Database** (start in test mode while developing, then lock down rules before going live).
- Enable **Authentication** if you want real user accounts (currently falls back to "anonymous_user" if no one is signed in).

### 2. Agora (the actual video call)
- Create a free account at https://www.agora.io
- Create a project in the Agora console to get an **App ID**.
- Paste it into `VideoCallActivity.java`:
  ```java
  private static final String AGORA_APP_ID = "YOUR_AGORA_APP_ID_HERE";
  ```
- The app currently joins channels with `null` as the token (fine for testing). Before releasing publicly, turn on **App ID + Token** security in the Agora console and generate tokens from a small backend — otherwise anyone with your App ID could join calls.

### 3. The interpreter side
This project builds the **user-facing app only**. Interpreters need a way to:
- See a list of `pending` entries under `/call_requests` in Firebase
- Set a request's `status` to `"accepted"` and their own ID to `acceptedByInterpreterId`
- Join the same Agora `channelName` from the request

The simplest starting point is a basic admin/interpreter version of this same app (or even a small web dashboard) that lists pending requests and has an "Accept" button. Happy to build that piece next if useful — it reuses the same Firebase structure.

## Known limitations / next steps
- No interpreter-matching logic yet (first interpreter to accept gets it — fine for a small pilot, but you may want load balancing or skill/language matching later, e.g. SASL vs ASL).
- No timeout/retry if no interpreter accepts within X seconds — currently waits indefinitely until cancelled.
- No push notifications to alert interpreters of a new request — they'd need the app open, or you'd want to add Firebase Cloud Messaging.
- Video call security relies on you enabling Agora token auth before real-world use.

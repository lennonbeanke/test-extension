package com.deafconnect.interpreter.activities;

import android.os.Bundle;
import android.view.SurfaceView;
import android.widget.FrameLayout;
import android.widget.ImageButton;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.deafconnect.interpreter.R;
import com.deafconnect.interpreter.utils.DatabaseHelper;

import io.agora.rtc2.ChannelMediaOptions;
import io.agora.rtc2.Constants;
import io.agora.rtc2.IRtcEngineEventHandler;
import io.agora.rtc2.RtcEngine;
import io.agora.rtc2.RtcEngineConfig;
import io.agora.rtc2.video.VideoCanvas;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

/**
 * The live video call screen. Uses Agora's RTC SDK to connect the deaf user
 * and the interpreter on a shared channel so they can communicate in sign
 * language in real time.
 *
 * IMPORTANT (setup required before this will actually connect):
 *   1. Create a free account at https://www.agora.io
 *   2. Create a project in the Agora console to get an App ID
 *   3. Paste that App ID into AGORA_APP_ID below
 *   4. For production, generate temporary tokens server-side instead of
 *      using no-token mode (Agora console -> Project -> "enable App ID +
 *      Token" for security once you're past testing).
 */
public class VideoCallActivity extends AppCompatActivity {

    public static final String EXTRA_CHANNEL_NAME = "channel_name";
    public static final String EXTRA_PLACE_TYPE = "place_type";

    // TODO: Replace with your own Agora App ID from https://console.agora.io
    private static final String AGORA_APP_ID = "YOUR_AGORA_APP_ID_HERE";

    private RtcEngine rtcEngine;
    private FrameLayout localVideoContainer;
    private FrameLayout remoteVideoContainer;
    private TextView tvCallInfo;

    private String channelName;
    private String placeType;
    private long callStartTime;

    private final IRtcEngineEventHandler rtcEventHandler = new IRtcEngineEventHandler() {
        @Override
        public void onUserJoined(int uid, int elapsed) {
            // The interpreter has joined - show their video feed.
            runOnUiThread(() -> setupRemoteVideo(uid));
        }

        @Override
        public void onUserOffline(int uid, int reason) {
            runOnUiThread(() -> {
                tvCallInfo.setText("Interpreter has left the call.");
                remoteVideoContainer.removeAllViews();
            });
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_video_call);

        channelName = getIntent().getStringExtra(EXTRA_CHANNEL_NAME);
        placeType = getIntent().getStringExtra(EXTRA_PLACE_TYPE);
        callStartTime = System.currentTimeMillis();

        localVideoContainer = findViewById(R.id.localVideoContainer);
        remoteVideoContainer = findViewById(R.id.remoteVideoContainer);
        tvCallInfo = findViewById(R.id.tvCallInfo);
        ImageButton endCallButton = findViewById(R.id.btnEndCall);

        tvCallInfo.setText("Connecting to interpreter (" + placeType + ")...");

        initializeAgoraEngine();
        setupLocalVideo();
        joinChannel();

        endCallButton.setOnClickListener(v -> endCall());
    }

    private void initializeAgoraEngine() {
        try {
            RtcEngineConfig config = new RtcEngineConfig();
            config.mContext = getBaseContext();
            config.mAppId = AGORA_APP_ID;
            config.mEventHandler = rtcEventHandler;
            rtcEngine = RtcEngine.create(config);
            rtcEngine.enableVideo();
        } catch (Exception e) {
            tvCallInfo.setText("Could not start video engine. Check Agora App ID setup.");
        }
    }

    private void setupLocalVideo() {
        SurfaceView surfaceView = RtcEngine.CreateRendererView(getBaseContext());
        localVideoContainer.addView(surfaceView);
        rtcEngine.setupLocalVideo(new VideoCanvas(surfaceView, VideoCanvas.RENDER_MODE_HIDDEN, 0));
    }

    private void setupRemoteVideo(int uid) {
        SurfaceView surfaceView = RtcEngine.CreateRendererView(getBaseContext());
        remoteVideoContainer.addView(surfaceView);
        rtcEngine.setupRemoteVideo(new VideoCanvas(surfaceView, VideoCanvas.RENDER_MODE_HIDDEN, uid));
        tvCallInfo.setText("Connected");
    }

    private void joinChannel() {
        ChannelMediaOptions options = new ChannelMediaOptions();
        options.channelProfile = Constants.CHANNEL_PROFILE_COMMUNICATION;
        options.clientRoleType = Constants.CLIENT_ROLE_BROADCASTER;
        // token is null here for quick testing; use a real token server in production
        rtcEngine.joinChannel(null, channelName, 0, options);
    }

    private void endCall() {
        long durationMs = System.currentTimeMillis() - callStartTime;
        String durationSummary = formatDuration(durationMs);
        String dateTime = new SimpleDateFormat("dd MMM yyyy, HH:mm", Locale.getDefault()).format(new Date());

        new DatabaseHelper(this).addCallRecord(placeType, dateTime, durationSummary, "completed");

        if (rtcEngine != null) {
            rtcEngine.leaveChannel();
        }
        finish();
    }

    private String formatDuration(long ms) {
        long seconds = (ms / 1000) % 60;
        long minutes = (ms / (1000 * 60)) % 60;
        return minutes + "m " + seconds + "s";
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (rtcEngine != null) {
            RtcEngine.destroy();
            rtcEngine = null;
        }
    }
}

package com.deafconnect.interpreter.activities;

import android.content.Intent;
import android.os.Bundle;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;

import com.deafconnect.interpreter.R;

/**
 * Home screen. Deliberately minimal: one large, unmistakable button to start
 * an urgent interpreter call, plus quick access to past calls.
 * Vibration is used instead of sound to confirm taps, since the primary
 * audience is deaf/hard-of-hearing users.
 */
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button urgentCallButton = findViewById(R.id.btnUrgentCall);
        Button historyButton = findViewById(R.id.btnCallHistory);

        urgentCallButton.setOnClickListener(v -> {
            vibrate();
            startActivity(new Intent(MainActivity.this, UrgentCallActivity.class));
        });

        historyButton.setOnClickListener(v ->
                startActivity(new Intent(MainActivity.this, CallHistoryActivity.class)));
    }

    private void vibrate() {
        Vibrator vibrator = (Vibrator) getSystemService(VIBRATOR_SERVICE);
        if (vibrator != null && vibrator.hasVibrator()) {
            vibrator.vibrate(VibrationEffect.createOneShot(150, VibrationEffect.DEFAULT_AMPLITUDE));
        }
    }
}

package com.deafconnect.interpreter.activities;

import android.os.Bundle;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.deafconnect.interpreter.R;
import com.deafconnect.interpreter.adapters.CallHistoryAdapter;
import com.deafconnect.interpreter.models.CallHistoryItem;
import com.deafconnect.interpreter.utils.DatabaseHelper;

import java.util.List;

public class CallHistoryActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_call_history);

        RecyclerView recyclerView = findViewById(R.id.rvCallHistory);
        TextView emptyState = findViewById(R.id.tvEmptyState);

        List<CallHistoryItem> calls = new DatabaseHelper(this).getAllCalls();

        if (calls.isEmpty()) {
            emptyState.setVisibility(TextView.VISIBLE);
            recyclerView.setVisibility(RecyclerView.GONE);
        } else {
            emptyState.setVisibility(TextView.GONE);
            recyclerView.setVisibility(RecyclerView.VISIBLE);
            recyclerView.setLayoutManager(new LinearLayoutManager(this));
            recyclerView.setAdapter(new CallHistoryAdapter(calls));
        }
    }
}

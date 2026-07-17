package com.deafconnect.interpreter.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.deafconnect.interpreter.R;
import com.deafconnect.interpreter.models.CallHistoryItem;

import java.util.List;

public class CallHistoryAdapter extends RecyclerView.Adapter<CallHistoryAdapter.ViewHolder> {

    private final List<CallHistoryItem> items;

    public CallHistoryAdapter(List<CallHistoryItem> items) {
        this.items = items;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_call_history, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        CallHistoryItem item = items.get(position);
        holder.tvPlaceType.setText(item.getPlaceType());
        holder.tvDateTime.setText(item.getDateTime());
        holder.tvDuration.setText(item.getDurationSummary());
        holder.tvStatus.setText(item.getStatus());
    }

    @Override
    public int getItemCount() {
        return items.size();
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView tvPlaceType, tvDateTime, tvDuration, tvStatus;

        ViewHolder(View itemView) {
            super(itemView);
            tvPlaceType = itemView.findViewById(R.id.tvHistoryPlaceType);
            tvDateTime = itemView.findViewById(R.id.tvHistoryDateTime);
            tvDuration = itemView.findViewById(R.id.tvHistoryDuration);
            tvStatus = itemView.findViewById(R.id.tvHistoryStatus);
        }
    }
}

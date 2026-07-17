package com.deafconnect.interpreter.models;

public class CallHistoryItem {

    private int id;
    private String placeType;
    private String dateTime;
    private String durationSummary; // e.g. "4m 12s" or "Missed"
    private String status;          // "completed", "missed", "cancelled"

    public CallHistoryItem(int id, String placeType, String dateTime, String durationSummary, String status) {
        this.id = id;
        this.placeType = placeType;
        this.dateTime = dateTime;
        this.durationSummary = durationSummary;
        this.status = status;
    }

    public int getId() { return id; }
    public String getPlaceType() { return placeType; }
    public String getDateTime() { return dateTime; }
    public String getDurationSummary() { return durationSummary; }
    public String getStatus() { return status; }
}

package com.deafconnect.interpreter.models;

/**
 * Represents a single urgent interpreter request.
 * Written to Firebase so any available interpreter can see and accept it.
 */
public class CallRequest {

    private String requestId;
    private String userId;
    private String placeType;   // "Hospital", "Police Station", "Government Office", "Bank", "Other"
    private String status;      // "pending", "accepted", "declined", "cancelled", "completed"
    private double latitude;
    private double longitude;
    private String channelName; // Agora channel name both sides join
    private long timestamp;
    private String acceptedByInterpreterId;

    public CallRequest() {
        // Required empty constructor for Firebase
    }

    public CallRequest(String requestId, String userId, String placeType,
                        double latitude, double longitude, String channelName) {
        this.requestId = requestId;
        this.userId = userId;
        this.placeType = placeType;
        this.latitude = latitude;
        this.longitude = longitude;
        this.channelName = channelName;
        this.status = "pending";
        this.timestamp = System.currentTimeMillis();
    }

    public String getRequestId() { return requestId; }
    public void setRequestId(String requestId) { this.requestId = requestId; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getPlaceType() { return placeType; }
    public void setPlaceType(String placeType) { this.placeType = placeType; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public double getLatitude() { return latitude; }
    public void setLatitude(double latitude) { this.latitude = latitude; }

    public double getLongitude() { return longitude; }
    public void setLongitude(double longitude) { this.longitude = longitude; }

    public String getChannelName() { return channelName; }
    public void setChannelName(String channelName) { this.channelName = channelName; }

    public long getTimestamp() { return timestamp; }
    public void setTimestamp(long timestamp) { this.timestamp = timestamp; }

    public String getAcceptedByInterpreterId() { return acceptedByInterpreterId; }
    public void setAcceptedByInterpreterId(String id) { this.acceptedByInterpreterId = id; }
}

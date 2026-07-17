package com.deafconnect.interpreter.utils;

import androidx.annotation.NonNull;

import com.deafconnect.interpreter.models.CallRequest;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.UUID;

/**
 * Wraps all Firebase Realtime Database calls related to urgent call requests.
 *
 * Database shape:
 *   /call_requests/{requestId}  -> CallRequest
 *   /interpreters/{interpreterId} -> Interpreter (status: online/busy/offline)
 */
public class FirebaseHelper {

    private static final String CALL_REQUESTS_PATH = "call_requests";
    private static final String INTERPRETERS_PATH = "interpreters";

    private final DatabaseReference database;

    public FirebaseHelper() {
        database = FirebaseDatabase.getInstance().getReference();
    }

    public interface RequestStatusListener {
        void onAccepted(String interpreterId, String channelName);
        void onDeclinedOrTimeout();
    }

    /**
     * Creates a new urgent call request that all online interpreters can see.
     * Returns the generated request so the caller can display/cancel it.
     */
    public CallRequest createUrgentRequest(String userId, String placeType,
                                            double latitude, double longitude) {
        String requestId = database.child(CALL_REQUESTS_PATH).push().getKey();
        if (requestId == null) {
            requestId = UUID.randomUUID().toString();
        }
        String channelName = "urgent_" + requestId;

        CallRequest request = new CallRequest(requestId, userId, placeType, latitude, longitude, channelName);
        database.child(CALL_REQUESTS_PATH).child(requestId).setValue(request);

        return request;
    }

    /**
     * Listens for an interpreter accepting this specific request.
     * Call removeListener(requestId) once the video call starts or the user cancels.
     */
    public void listenForAcceptance(String requestId, RequestStatusListener listener) {
        database.child(CALL_REQUESTS_PATH).child(requestId)
                .addValueEventListener(new ValueEventListener() {
                    @Override
                    public void onDataChange(@NonNull DataSnapshot snapshot) {
                        CallRequest request = snapshot.getValue(CallRequest.class);
                        if (request == null) return;

                        if ("accepted".equals(request.getStatus())) {
                            listener.onAccepted(request.getAcceptedByInterpreterId(), request.getChannelName());
                        } else if ("declined".equals(request.getStatus())
                                || "cancelled".equals(request.getStatus())) {
                            listener.onDeclinedOrTimeout();
                        }
                    }

                    @Override
                    public void onCancelled(@NonNull DatabaseError error) {
                        listener.onDeclinedOrTimeout();
                    }
                });
    }

    public void cancelRequest(String requestId) {
        database.child(CALL_REQUESTS_PATH).child(requestId).child("status").setValue("cancelled");
    }

    public void markCompleted(String requestId) {
        database.child(CALL_REQUESTS_PATH).child(requestId).child("status").setValue("completed");
    }

    public void stopListening(String requestId) {
        // Detach listeners when leaving the screen to avoid leaks.
        database.child(CALL_REQUESTS_PATH).child(requestId).removeEventListener(new ValueEventListener() {
            @Override public void onDataChange(@NonNull DataSnapshot snapshot) {}
            @Override public void onCancelled(@NonNull DatabaseError error) {}
        });
    }
}

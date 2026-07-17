package com.deafconnect.interpreter.utils;

import android.annotation.SuppressLint;
import android.content.Context;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;

/**
 * Grabs a one-time GPS fix so the interpreter knows where the urgent call
 * is coming from (e.g. a hospital or police station).
 * Caller is responsible for checking/requesting location permission first.
 */
public class LocationHelper {

    public interface LocationCallback {
        void onLocationFound(double latitude, double longitude);
        void onLocationUnavailable();
    }

    @SuppressLint("MissingPermission")
    public static void getCurrentLocation(Context context, LocationCallback callback) {
        FusedLocationProviderClient client =
                LocationServices.getFusedLocationProviderClient(context);

        client.getLastLocation()
                .addOnSuccessListener(location -> {
                    if (location != null) {
                        callback.onLocationFound(location.getLatitude(), location.getLongitude());
                    } else {
                        callback.onLocationUnavailable();
                    }
                })
                .addOnFailureListener(e -> callback.onLocationUnavailable());
    }
}

package com.deafconnect.interpreter.utils;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import com.deafconnect.interpreter.models.CallHistoryItem;

import java.util.ArrayList;
import java.util.List;

/**
 * Stores a local log of urgent calls the user has made, so they can review
 * past requests even without a network connection.
 */
public class DatabaseHelper extends SQLiteOpenHelper {

    private static final String DB_NAME = "call_history.db";
    private static final int DB_VERSION = 1;

    private static final String TABLE_HISTORY = "call_history";
    private static final String COL_ID = "id";
    private static final String COL_PLACE_TYPE = "place_type";
    private static final String COL_DATETIME = "date_time";
    private static final String COL_DURATION = "duration_summary";
    private static final String COL_STATUS = "status";

    public DatabaseHelper(Context context) {
        super(context, DB_NAME, null, DB_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        String createTable = "CREATE TABLE " + TABLE_HISTORY + " (" +
                COL_ID + " INTEGER PRIMARY KEY AUTOINCREMENT, " +
                COL_PLACE_TYPE + " TEXT, " +
                COL_DATETIME + " TEXT, " +
                COL_DURATION + " TEXT, " +
                COL_STATUS + " TEXT)";
        db.execSQL(createTable);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS " + TABLE_HISTORY);
        onCreate(db);
    }

    public void addCallRecord(String placeType, String dateTime, String durationSummary, String status) {
        SQLiteDatabase db = getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put(COL_PLACE_TYPE, placeType);
        values.put(COL_DATETIME, dateTime);
        values.put(COL_DURATION, durationSummary);
        values.put(COL_STATUS, status);
        db.insert(TABLE_HISTORY, null, values);
        db.close();
    }

    public List<CallHistoryItem> getAllCalls() {
        List<CallHistoryItem> list = new ArrayList<>();
        SQLiteDatabase db = getReadableDatabase();
        Cursor cursor = db.query(TABLE_HISTORY, null, null, null, null, null,
                COL_ID + " DESC");

        if (cursor.moveToFirst()) {
            do {
                list.add(new CallHistoryItem(
                        cursor.getInt(cursor.getColumnIndexOrThrow(COL_ID)),
                        cursor.getString(cursor.getColumnIndexOrThrow(COL_PLACE_TYPE)),
                        cursor.getString(cursor.getColumnIndexOrThrow(COL_DATETIME)),
                        cursor.getString(cursor.getColumnIndexOrThrow(COL_DURATION)),
                        cursor.getString(cursor.getColumnIndexOrThrow(COL_STATUS))
                ));
            } while (cursor.moveToNext());
        }
        cursor.close();
        db.close();
        return list;
    }
}

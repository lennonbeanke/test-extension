package com.deafconnect.interpreter.models;

/**
 * Represents a sign-language interpreter who can be matched to an urgent call.
 */
public class Interpreter {

    private String id;
    private String name;
    private String status; // "online", "busy", "offline"
    private String agoraUid;
    private String language; // e.g. "SASL" (South African Sign Language), "ASL"

    public Interpreter() {
        // Required empty constructor for Firebase
    }

    public Interpreter(String id, String name, String status, String agoraUid, String language) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.agoraUid = agoraUid;
        this.language = language;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getAgoraUid() { return agoraUid; }
    public void setAgoraUid(String agoraUid) { this.agoraUid = agoraUid; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public boolean isAvailable() {
        return "online".equalsIgnoreCase(status);
    }
}

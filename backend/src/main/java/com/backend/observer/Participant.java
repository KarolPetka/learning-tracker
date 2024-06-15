package com.backend.observer;

public class Participant implements ParticipantObserver {
    private final String name;

    public Participant(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public String update(String courseName, int progress) {
        return "Participant " + name + " got a notification about progress in course " + courseName + ": " + progress + "%";
    }
}

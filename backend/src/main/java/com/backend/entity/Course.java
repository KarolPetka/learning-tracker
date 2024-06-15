package com.backend.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.backend.observer.Participant;
import com.backend.observer.ParticipantObserver;
import com.backend.strategy.ProgressStrategy;
import com.backend.strategy.TimeBaseProgressStrategy;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize
public class Course {
    private String name;
    private int progress;
    private List<ParticipantObserver> observers = new ArrayList<>();
    private ProgressStrategy strategy;

    public Course(String name) {
        this.name = name;
        this.strategy = new TimeBaseProgressStrategy();
    }

    public List<ParticipantObserver> getObservers() {
        return observers;
    }

    public void addObserver(ParticipantObserver observer) {
        observers.add(observer);
    }

    public void removeObserver(ParticipantObserver observer) {
        observers.remove(observer);
    }

    public List<String> notifyObservers() {
        List<String> notifications = new ArrayList<>();
        for (ParticipantObserver observer : observers) {
            notifications.add(observer.update(name, progress));
        }
        return notifications;
    }

    public void setName(String name) {
        this.name = name;
    }


    public List<String> setProgress(int progress) {
        this.progress = progress;
        return notifyObservers();
    }

    public void setStrategy(ProgressStrategy strategy) {
        this.strategy = strategy;
    }

    public void setEvaluationStrategy(ProgressStrategy strategy) {
        this.strategy = strategy;
    }

    public String evaluateProgress() {
        return strategy.evaluateProgress(progress);
    }

    public static String getCoursesAsJson(Map<String, Course> courses) {
        List<String> coursesJsonList = courses.values().stream()
                .map(Course::toJson)
                .collect(Collectors.toList());

        return "[" + String.join(",", coursesJsonList) + "]";
    }

    public String toJson() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            String observersNames = mapper.writeValueAsString(observers.stream()
                    .filter(Participant.class::isInstance)
                    .map(observer -> ((Participant) observer).getName())
                    .collect(Collectors.toList()));
            String strategyName = strategy.getClass().getSimpleName();

            return "{" +
                    "\"name\":\"" + name + "\"," +
                    "\"progress\":\"" + strategy.evaluateProgress(progress) + "\"," +
                    "\"observers\":" + observersNames + "," +
                    "\"strategy\":\"" + strategyName + "\"" +
                    "}";
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "{}";
        }
    }
}

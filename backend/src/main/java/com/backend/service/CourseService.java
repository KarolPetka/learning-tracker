package com.backend.service;

import com.backend.entity.Course;
import com.backend.factory.ProgressEvaluationStrategyFactory;
import com.backend.observer.Participant;
import com.backend.strategy.ProgressStrategy;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CourseService {
    private final Map<String, Course> courses = new HashMap<>();
    private final ParticipantService participantService;
    private final ProgressEvaluationStrategyFactory strategyFactory;

    public CourseService(ParticipantService participantService, ProgressEvaluationStrategyFactory strategyFactory) {
        this.participantService = participantService;
        this.strategyFactory = strategyFactory;
    }

    public String getCourses() {
        return Course.getCoursesAsJson(courses);
    }

    public String getProgress(String courseName) {
        Course course = courses.get(courseName);
        if (course != null) {
            return course.evaluateProgress();
        } else {
            throw new IllegalArgumentException("Unknown course name: " + courseName);
        }
    }

    public String setProgress(String courseName, int progress) {
        Course course = courses.get(courseName);
        if (course != null) {
            Gson gson = new Gson();
            JsonArray jsonArray = gson.toJsonTree(course.setProgress(progress)).getAsJsonArray();
            return jsonArray.toString();
        } else {
            throw new IllegalArgumentException("Unknown course name: " + courseName);
        }
    }

    public void deleteCourse(String courseName) {
        courses.remove(courseName);
    }

    public void updateCourse(String courseName, String newName) {
        if (courses.containsKey(courseName)) {
            Course course = courses.remove(courseName);
            course.setName(newName);
            courses.put(newName, course);
        } else {
            throw new IllegalArgumentException("Unknown course name: " + courseName);
        }
    }

    public void addCourse(String courseName, String strategyName) {
        ProgressStrategy strategy = strategyFactory.createStrategy(strategyName);
        Course newCourse = new Course(courseName);
        newCourse.setStrategy(strategy);
        courses.put(courseName, newCourse);
    }

    public void assignUserToCourse(String courseName, String userName) {
        Course course = courses.get(courseName);
        Participant user = participantService.getUser(userName);

        if (course != null && user != null && !course.getObservers().contains(user)) {
            course.addObserver(user);
        } else {
            throw new IllegalArgumentException("Course or user does not exist: " + courseName + ", " + userName);
        }
    }
}

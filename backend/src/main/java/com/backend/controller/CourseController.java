package com.backend.controller;

import com.backend.service.CourseService;
import com.backend.service.ParticipantService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/courses")
public class CourseController {
    private final CourseService courseService;
    private final ParticipantService participantService;

    public CourseController(CourseService courseService, ParticipantService participantService) {
        this.courseService = courseService;
        this.participantService = participantService;
    }

    @GetMapping("")
    public String getCourses() {
        return courseService.getCourses();
    }

    @GetMapping("/users")
    public String getUsers() {
        return participantService.getUsers();
    }

    @GetMapping("/{courseName}/progress")
    public String getProgress(@PathVariable String courseName) {
        return courseService.getProgress(courseName);
    }

    @PostMapping("/add")
    public void addCourse(@RequestParam String courseName, @RequestParam String strategyName) {
        courseService.addCourse(courseName, strategyName);
    }

    @PostMapping("/users/add")
    public void addUser(@RequestParam String userName) {
        participantService.addUser(userName);
    }

    @PostMapping("/{courseName}/progress")
    public String updateProgress(@PathVariable String courseName, @RequestParam int progress) {
        return courseService.setProgress(courseName, progress);
    }

    @PostMapping("/{courseName}/assign")
    public void assignUserToCourse(@PathVariable String courseName, @RequestParam String userName) {
        courseService.assignUserToCourse(courseName, userName);
    }

    @PutMapping("/{courseName}")
    public void updateCourse(@PathVariable String courseName, @RequestParam String newName) {
        courseService.updateCourse(courseName, newName);
    }

    @DeleteMapping("/{courseName}")
    public void deleteCourse(@PathVariable String courseName) {
        courseService.deleteCourse(courseName);
    }
}

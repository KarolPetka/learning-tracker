package com.backend.strategy;

public class TimeBaseProgressStrategy implements ProgressStrategy {
    @Override
    public String evaluateProgress(int progress) {
        if (progress < 100) {
            return "Beginner";
        } else if (progress < 500) {
            return "Intermediate";
        } else if (progress < 1000) {
            return "Advanced";
        } else {
            return "Expert";
        }
    }
}

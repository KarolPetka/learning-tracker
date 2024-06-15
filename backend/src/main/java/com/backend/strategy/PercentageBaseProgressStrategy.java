package com.backend.strategy;

public class PercentageBaseProgressStrategy implements ProgressStrategy {
    @Override
    public String evaluateProgress(int progress) {
        if (progress < 25) {
            return "Beginner";
        } else if (progress < 50) {
            return "Intermediate";
        } else if (progress < 75)
            return "Advanced";
        else {
            return "Expert";
        }
    }
}

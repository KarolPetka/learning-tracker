package com.backend.factory;

import com.backend.strategy.ProgressStrategy;

public interface ProgressEvaluationStrategyFactory {
    ProgressStrategy createStrategy(String strategyName);
}

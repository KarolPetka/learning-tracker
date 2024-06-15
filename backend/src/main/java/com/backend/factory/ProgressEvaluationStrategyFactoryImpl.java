package com.backend.factory;

import com.backend.strategy.PercentageBaseProgressStrategy;
import com.backend.strategy.ProgressStrategy;
import com.backend.strategy.TimeBaseProgressStrategy;
import org.springframework.stereotype.Component;

@Component
public class ProgressEvaluationStrategyFactoryImpl implements ProgressEvaluationStrategyFactory {

    @Override
    public ProgressStrategy createStrategy(String strategyName) {
        final String percent = "percent";
        final String time = "time";

        return switch (strategyName) {
            case percent -> new PercentageBaseProgressStrategy();
            case time -> new TimeBaseProgressStrategy();
            default -> throw new IllegalArgumentException("Unknown strategy: " + strategyName);
        };
    }
}


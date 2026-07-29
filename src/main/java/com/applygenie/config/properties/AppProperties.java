package com.applygenie.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

@ConfigurationProperties(prefix = "app")
public record AppProperties(Cors cors, Frontend frontend) {
    public record Cors(List<String> allowedOrigins) {
    }

    public record Frontend(String url) {
    }
}

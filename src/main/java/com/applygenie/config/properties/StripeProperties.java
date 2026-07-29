package com.applygenie.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "stripe")
public record StripeProperties(Api api, Webhook webhook, Price price) {
    public record Api(String key) {
    }

    public record Webhook(String secret) {
    }

    public record Price(String pro) {
    }
}

package com.applygenie.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/")
    public Map<String, String> home() {
        return Map.of(
            "status", "UP",
            "message", "Welcome to ApplyGenie AI Backend!",
            "version", "0.0.1-SNAPSHOT"
        );
    }
}

package com.applygenie.service.impl;

import com.applygenie.service.AIService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import io.github.resilience4j.retry.annotation.Retry;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;

@Service
@RequiredArgsConstructor
public class OpenAIServiceImpl implements AIService {

    @Value("${openai.api-key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String OPENAI_URL = "https://api.openai.com/v1/chat/completions";

    @Override
    @io.github.resilience4j.retry.annotation.Retry(name = "openai")
    @io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker(name = "openai", fallbackMethod = "fallbackOpenAI")
    public String analyzeResume(String resumeText, String jobDescription) {
        String prompt = String.format(
                "Analyze this resume based on the following job description. " +
                "Provide a match score (0-100) and 3 key reasons why this candidate is a good/bad fit.\n\n" +
                "Resume:\n%s\n\nJob Description:\n%s", 
                resumeText, jobDescription);
        
        return callOpenAI(prompt);
    }

    @Override
    public String suggestImprovements(String resumeText) {
        String prompt = "Suggest 5 specific professional improvements for the following resume to make it more impactful for a senior software engineering role:\n\n" + resumeText;
        return callOpenAI(prompt);
    }

    private String callOpenAI(String prompt) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        Map<String, Object> body = new HashMap<>();
        body.put("model", "gpt-4o");
        body.put("messages", List.of(
                Map.of("role", "system", "content", "You are an expert HR and Career Coach."),
                Map.of("role", "user", "content", prompt)
        ));

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
        
        try {
            Map<String, Object> response = restTemplate.postForObject(OPENAI_URL, request, Map.class);
            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
            Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
            return (String) message.get("content");
        } catch (Exception e) {
            return "Error calling OpenAI: " + e.getMessage();
        }
    }

    public String fallbackOpenAI(String resumeText, String jobDescription, Throwable t) {
        return "AI Analysis is currently unavailable. Please try again later. (Cause: " + t.getMessage() + ")";
    }
}

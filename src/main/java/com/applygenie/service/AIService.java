package com.applygenie.service;

public interface AIService {
    String analyzeResume(String resumeText, String jobDescription);
    String suggestImprovements(String resumeText);
}

package com.applygenie.service;

import com.applygenie.entity.GeneratedContent;

public interface AiWorkerService {
    void processAIGeneration(GeneratedContent content, String resumeText, String jobDescription);
}

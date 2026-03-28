package com.applygenie.service.impl;

import com.applygenie.entity.GeneratedContent;
import com.applygenie.entity.GenerationStatus;
import com.applygenie.repository.GeneratedContentRepository;
import com.applygenie.service.AIService;
import com.applygenie.service.AiWorkerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AiWorkerServiceImpl implements AiWorkerService {

    private final AIService aiService;
    private final GeneratedContentRepository generatedContentRepository;

    @Override
    @Async
    public void processAIGeneration(GeneratedContent content, String resumeText, String jobDescription) {
        log.info("Starting async AI generation for content ID: {}", content.getId());
        try {
            String coverLetter = aiService.analyzeResume(resumeText, jobDescription);
            String summary = aiService.suggestImprovements(resumeText);

            content.setCoverLetter(coverLetter);
            content.setCvSummary(summary);
            content.setStatus(GenerationStatus.COMPLETED);
            
            generatedContentRepository.save(content);
            log.info("AI generation completed successfully for content ID: {}", content.getId());
        } catch (Exception e) {
            log.error("AI generation failed for content ID: {}. Error: {}", content.getId(), e.getMessage());
            content.setStatus(GenerationStatus.FAILED);
            generatedContentRepository.save(content);
        }
    }
}

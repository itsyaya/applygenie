package com.applygenie.service.impl;

import com.applygenie.dto.request.GenerationRequest;
import com.applygenie.entity.GeneratedContent;
import com.applygenie.entity.JobDescription;
import com.applygenie.entity.Resume;
import com.applygenie.entity.User;
import com.applygenie.exception.custom.ResourceNotFoundException;
import com.applygenie.exception.custom.UnauthorizedAccessException;
import com.applygenie.repository.GeneratedContentRepository;
import com.applygenie.repository.JobDescriptionRepository;
import com.applygenie.repository.ResumeRepository;
import com.applygenie.security.CurrentUserService;
import com.applygenie.service.AiGenerationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AiGenerationServiceImpl implements AiGenerationService {

    private final GeneratedContentRepository generatedContentRepository;
    private final ResumeRepository resumeRepository;
    private final JobDescriptionRepository jobDescriptionRepository;
    private final CurrentUserService currentUserService;
    private final com.applygenie.service.UsageService usageService;
    private final com.applygenie.service.AiWorkerService aiWorkerService;

    @Override
    @org.springframework.transaction.annotation.Transactional
    public GeneratedContent generateContent(GenerationRequest request) {
        User currentUser = currentUserService.getCurrentUser();

        if (!usageService.canGenerate(currentUser)) {
            throw new IllegalStateException("AI generation limit reached for your plan. Please upgrade to Pro.");
        }

        Resume resume = resumeRepository.findById(request.resumeId())
                .orElseThrow(() -> new ResourceNotFoundException("Resume not found"));

        JobDescription jobDescription = jobDescriptionRepository.findById(request.jobId())
                .orElseThrow(() -> new ResourceNotFoundException("Job Description not found"));

        if (!resume.getUser().getId().equals(currentUser.getId()) ||
                !jobDescription.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedAccessException("Unauthorized to access these resources");
        }

        // 1. Create PENDING content record
        GeneratedContent content = GeneratedContent.builder()
                .user(currentUser)
                .resume(resume)
                .jobDescription(jobDescription)
                .status(com.applygenie.entity.GenerationStatus.PENDING)
                .build();

        GeneratedContent savedContent = generatedContentRepository.save(content);

        // 2. Trigger async AI processing
        aiWorkerService.processAIGeneration(savedContent, resume.getParsedText(), jobDescription.getDescription());

        return savedContent;
    }

    @Override
    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public Page<GeneratedContent> getUserGeneratedContents(Pageable pageable) {
        return generatedContentRepository.findByUserId(currentUserService.getCurrentUser().getId(), pageable);
    }
}

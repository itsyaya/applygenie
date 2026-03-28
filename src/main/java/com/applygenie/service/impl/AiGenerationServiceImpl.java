package com.applygenie.service.impl;

import com.applygenie.dto.request.GenerationRequest;
import com.applygenie.entity.GeneratedContent;
import com.applygenie.entity.JobDescription;
import com.applygenie.entity.Resume;
import com.applygenie.entity.User;
import com.applygenie.repository.GeneratedContentRepository;
import com.applygenie.repository.JobDescriptionRepository;
import com.applygenie.repository.ResumeRepository;
import com.applygenie.repository.UserRepository;
import com.applygenie.security.CustomUserDetails;
import com.applygenie.service.AiGenerationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AiGenerationServiceImpl implements AiGenerationService {

    private final GeneratedContentRepository generatedContentRepository;
    private final ResumeRepository resumeRepository;
    private final JobDescriptionRepository jobDescriptionRepository;
    private final UserRepository userRepository;
    private final com.applygenie.service.UsageService usageService;
    private final com.applygenie.service.AiWorkerService aiWorkerService;

    @Override
    @org.springframework.transaction.annotation.Transactional
    public GeneratedContent generateContent(GenerationRequest request) {
        User currentUser = getCurrentUser();

        if (!usageService.canGenerate(currentUser)) {
            throw new RuntimeException("AI generation limit reached for your plan. Please upgrade to Pro.");
        }

        Resume resume = resumeRepository.findById(request.getResumeId())
                .orElseThrow(() -> new RuntimeException("Resume not found"));

        JobDescription jobDescription = jobDescriptionRepository.findById(request.getJobId())
                .orElseThrow(() -> new RuntimeException("Job Description not found"));

        if (!resume.getUser().getId().equals(currentUser.getId()) ||
            !jobDescription.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized to access these resources");
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
    public List<GeneratedContent> getUserGeneratedContents() {
        return generatedContentRepository.findByUserId(getCurrentUser().getId());
    }

    private User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof CustomUserDetails userDetails) {
            String username = userDetails.getUsername();
            return userRepository.findByEmail(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));
        }
        throw new RuntimeException("Unauthorized");
    }
}

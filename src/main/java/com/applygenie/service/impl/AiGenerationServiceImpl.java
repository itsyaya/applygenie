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

    @Override
    public GeneratedContent generateContent(GenerationRequest request) {
        User currentUser = getCurrentUser();

        Resume resume = resumeRepository.findById(request.getResumeId())
                .orElseThrow(() -> new RuntimeException("Resume not found"));

        JobDescription jobDescription = jobDescriptionRepository.findById(request.getJobId())
                .orElseThrow(() -> new RuntimeException("Job Description not found"));

        if (!resume.getUser().getId().equals(currentUser.getId()) ||
            !jobDescription.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized to access these resources");
        }

        // Mock AI Generation call here - ideally you'd use a RestTemplate/WebClient to call OpenAI API
        String generatedCoverLetter = "Dear Hiring Manager at " + jobDescription.getCompanyName() + "...\n\n" +
                "I am writing to apply for the " + jobDescription.getJobTitle() + " role.\n" +
                "Based on my resume (" + resume.getFileName() + "), I am a great fit for your organization.";

        String generatedCvSummary = "A tailored CV summary highlighting alignment with " + jobDescription.getJobTitle() + " at " + jobDescription.getCompanyName() + ".";

        GeneratedContent content = GeneratedContent.builder()
                .user(currentUser)
                .resume(resume)
                .jobDescription(jobDescription)
                .coverLetter(generatedCoverLetter)
                .cvSummary(generatedCvSummary)
                .build();

        return generatedContentRepository.save(content);
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

package com.applygenie.service.impl;

import com.applygenie.dto.request.JobDescriptionRequest;
import com.applygenie.entity.JobDescription;
import com.applygenie.entity.User;
import com.applygenie.repository.JobDescriptionRepository;
import com.applygenie.repository.UserRepository;
import com.applygenie.security.CustomUserDetails;
import com.applygenie.service.JobService;
import com.applygenie.service.AIService;
import com.applygenie.repository.ResumeRepository;
import com.applygenie.entity.Resume;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    private final JobDescriptionRepository jobDescriptionRepository;
    private final UserRepository userRepository;

    private final AIService aiService;
    private final ResumeRepository resumeRepository;

    @Override
    public JobDescription createJobDescription(JobDescriptionRequest request) {
        User currentUser = getCurrentUser();
        JobDescription job = JobDescription.builder()
                .user(currentUser)
                .title(request.getTitle())
                .description(request.getDescription())
                .company(request.getCompany())
                .build();
        return jobDescriptionRepository.save(job);
    }

    @Override
    public String matchResumeWithJob(Long resumeId, Long jobId) {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new RuntimeException("Resume not found"));
        JobDescription job = jobDescriptionRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        return aiService.analyzeResume(resume.getParsedText(), job.getDescription());
    }

    @Override
    public org.springframework.data.domain.Page<JobDescription> getUserJobs(org.springframework.data.domain.Pageable pageable) {
        return jobDescriptionRepository.findByUserId(getCurrentUser().getId(), pageable);
    }

    private User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = ((CustomUserDetails) principal).getUsername();
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}

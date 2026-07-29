package com.applygenie.service.impl;

import com.applygenie.dto.request.JobDescriptionRequest;
import com.applygenie.entity.JobDescription;
import com.applygenie.entity.Resume;
import com.applygenie.entity.User;
import com.applygenie.exception.custom.ResourceNotFoundException;
import com.applygenie.exception.custom.UnauthorizedAccessException;
import com.applygenie.repository.JobDescriptionRepository;
import com.applygenie.repository.ResumeRepository;
import com.applygenie.security.CurrentUserService;
import com.applygenie.service.AIService;
import com.applygenie.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    private final JobDescriptionRepository jobDescriptionRepository;
    private final ResumeRepository resumeRepository;
    private final CurrentUserService currentUserService;
    private final AIService aiService;

    @Override
    @Transactional
    public JobDescription createJobDescription(JobDescriptionRequest request) {
        User currentUser = currentUserService.getCurrentUser();
        JobDescription job = JobDescription.builder()
                .user(currentUser)
                .title(request.title())
                .description(request.description())
                .company(request.company())
                .build();
        return jobDescriptionRepository.save(job);
    }

    @Override
    @Transactional(readOnly = true)
    public String matchResumeWithJob(Long resumeId, Long jobId) {
        User currentUser = currentUserService.getCurrentUser();

        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new ResourceNotFoundException("Resume not found"));
        JobDescription job = jobDescriptionRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        if (!resume.getUser().getId().equals(currentUser.getId()) ||
                !job.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedAccessException("Unauthorized to access these resources");
        }

        return aiService.analyzeResume(resume.getParsedText(), job.getDescription());
    }

    @Override
    @Transactional(readOnly = true)
    public Page<JobDescription> getUserJobs(Pageable pageable) {
        return jobDescriptionRepository.findByUserId(currentUserService.getCurrentUser().getId(), pageable);
    }
}

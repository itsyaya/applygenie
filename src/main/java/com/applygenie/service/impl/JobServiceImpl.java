package com.applygenie.service.impl;

import com.applygenie.dto.request.JobDescriptionRequest;
import com.applygenie.entity.JobDescription;
import com.applygenie.entity.User;
import com.applygenie.repository.JobDescriptionRepository;
import com.applygenie.repository.UserRepository;
import com.applygenie.security.CustomUserDetails;
import com.applygenie.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    private final JobDescriptionRepository jobDescriptionRepository;
    private final UserRepository userRepository;

    @Override
    public JobDescription createJobDescription(JobDescriptionRequest request) {
        User currentUser = getCurrentUser();

        JobDescription jobDescription = JobDescription.builder()
                .user(currentUser)
                .companyName(request.getCompanyName())
                .jobTitle(request.getJobTitle())
                .descriptionText(request.getDescriptionText())
                .build();

        return jobDescriptionRepository.save(jobDescription);
    }

    @Override
    public List<JobDescription> getUserJobs() {
        return jobDescriptionRepository.findByUserId(getCurrentUser().getId());
    }

    private User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = ((CustomUserDetails) principal).getUsername();
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}

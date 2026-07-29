package com.applygenie.service;

import com.applygenie.dto.request.JobApplicationFilter;
import com.applygenie.dto.request.JobApplicationRequest;
import com.applygenie.entity.ApplicationStatus;
import com.applygenie.entity.JobApplication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface JobApplicationService {
    JobApplication create(JobApplicationRequest request);

    JobApplication update(Long id, JobApplicationRequest request);

    JobApplication updateStatus(Long id, ApplicationStatus status);

    JobApplication archive(Long id);

    JobApplication restore(Long id);

    void delete(Long id);

    JobApplication getOwnedApplication(Long id);

    Page<JobApplication> search(JobApplicationFilter filter, Pageable pageable);

    String matchResumeWithJob(Long resumeId, Long jobId);

    JobApplication addTag(Long jobApplicationId, Long tagId);

    JobApplication removeTag(Long jobApplicationId, Long tagId);
}

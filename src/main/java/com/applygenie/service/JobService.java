package com.applygenie.service;

import com.applygenie.dto.request.JobDescriptionRequest;
import com.applygenie.entity.JobDescription;

import java.util.List;

public interface JobService {
    JobDescription createJobDescription(JobDescriptionRequest request);
    org.springframework.data.domain.Page<JobDescription> getUserJobs(org.springframework.data.domain.Pageable pageable);
    String matchResumeWithJob(Long resumeId, Long jobId);
}

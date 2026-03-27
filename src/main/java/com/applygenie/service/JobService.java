package com.applygenie.service;

import com.applygenie.dto.request.JobDescriptionRequest;
import com.applygenie.entity.JobDescription;

import java.util.List;

public interface JobService {
    JobDescription createJobDescription(JobDescriptionRequest request);
    List<JobDescription> getUserJobs();
}

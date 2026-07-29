package com.applygenie.controller;

import com.applygenie.dto.request.JobDescriptionRequest;
import com.applygenie.dto.response.ApiResponse;
import com.applygenie.dto.response.JobDescriptionResponse;
import com.applygenie.entity.JobDescription;
import com.applygenie.mapper.JobDescriptionMapper;
import com.applygenie.service.JobService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/job")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;
    private final JobDescriptionMapper jobDescriptionMapper;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<JobDescriptionResponse>> createJobDescription(
            @Valid @RequestBody JobDescriptionRequest request) {
        JobDescription savedJob = jobService.createJobDescription(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Job description saved safely", jobDescriptionMapper.toResponse(savedJob)));
    }

    @GetMapping("/user")
    public ResponseEntity<ApiResponse<Page<JobDescriptionResponse>>> getUserJobs(
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<JobDescriptionResponse> jobs = jobService.getUserJobs(pageable).map(jobDescriptionMapper::toResponse);
        return ResponseEntity.ok(ApiResponse.success("User jobs fetched", jobs));
    }

    @PostMapping("/{jobId}/match/{resumeId}")
    public ResponseEntity<ApiResponse<String>> matchResume(@PathVariable Long jobId, @PathVariable Long resumeId) {
        String analysis = jobService.matchResumeWithJob(resumeId, jobId);
        return ResponseEntity.ok(ApiResponse.success("AI Matching completed", analysis));
    }
}

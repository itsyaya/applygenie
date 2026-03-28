package com.applygenie.controller;

import com.applygenie.dto.request.JobDescriptionRequest;
import com.applygenie.dto.response.ApiResponse;
import com.applygenie.entity.JobDescription;
import com.applygenie.service.JobService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/job")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<JobDescription>> createJobDescription(@Valid @RequestBody JobDescriptionRequest request) {
        JobDescription savedJob = jobService.createJobDescription(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(true, "Job description saved safely", savedJob));
    }

    @GetMapping("/user")
    public ResponseEntity<ApiResponse<org.springframework.data.domain.Page<JobDescription>>> getUserJobs(
            @org.springframework.data.web.PageableDefault(size = 10, sort = "createdAt", direction = org.springframework.data.domain.Sort.Direction.DESC) 
            org.springframework.data.domain.Pageable pageable) {
        org.springframework.data.domain.Page<JobDescription> jobs = jobService.getUserJobs(pageable);
        return ResponseEntity.ok(new ApiResponse<>(true, "User jobs fetched", jobs));
    }

    @PostMapping("/{jobId}/match/{resumeId}")
    public ResponseEntity<ApiResponse<String>> matchResume(@PathVariable Long jobId, @PathVariable Long resumeId) {
        String analysis = jobService.matchResumeWithJob(resumeId, jobId);
        return ResponseEntity.ok(new ApiResponse<>(true, "AI Matching completed", analysis));
    }
}

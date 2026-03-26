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
    public ResponseEntity<ApiResponse<List<JobDescription>>> getUserJobs() {
        List<JobDescription> jobs = jobService.getUserJobs();
        return ResponseEntity.ok(new ApiResponse<>(true, "User jobs fetched", jobs));
    }
}

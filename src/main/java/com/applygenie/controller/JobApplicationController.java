package com.applygenie.controller;

import com.applygenie.dto.request.JobApplicationFilter;
import com.applygenie.dto.request.JobApplicationRequest;
import com.applygenie.dto.request.UpdateApplicationStatusRequest;
import com.applygenie.dto.response.ApiResponse;
import com.applygenie.dto.response.JobApplicationResponse;
import com.applygenie.entity.ApplicationStatus;
import com.applygenie.entity.JobApplication;
import com.applygenie.entity.Priority;
import com.applygenie.mapper.JobApplicationMapper;
import com.applygenie.service.JobApplicationService;
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
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;
    private final JobApplicationMapper jobApplicationMapper;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<JobApplicationResponse>> create(
            @Valid @RequestBody JobApplicationRequest request) {
        JobApplication saved = jobApplicationService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Job application created", jobApplicationMapper.toResponse(saved)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<JobApplicationResponse>> update(
            @PathVariable Long id, @Valid @RequestBody JobApplicationRequest request) {
        JobApplication updated = jobApplicationService.update(id, request);
        return ResponseEntity.ok(ApiResponse.success("Job application updated", jobApplicationMapper.toResponse(updated)));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<JobApplicationResponse>> updateStatus(
            @PathVariable Long id, @Valid @RequestBody UpdateApplicationStatusRequest request) {
        JobApplication updated = jobApplicationService.updateStatus(id, request.status());
        return ResponseEntity.ok(ApiResponse.success("Status updated", jobApplicationMapper.toResponse(updated)));
    }

    @PostMapping("/{id}/archive")
    public ResponseEntity<ApiResponse<JobApplicationResponse>> archive(@PathVariable Long id) {
        JobApplication archived = jobApplicationService.archive(id);
        return ResponseEntity.ok(ApiResponse.success("Job application archived", jobApplicationMapper.toResponse(archived)));
    }

    @PostMapping("/{id}/restore")
    public ResponseEntity<ApiResponse<JobApplicationResponse>> restore(@PathVariable Long id) {
        JobApplication restored = jobApplicationService.restore(id);
        return ResponseEntity.ok(ApiResponse.success("Job application restored", jobApplicationMapper.toResponse(restored)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        jobApplicationService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Job application deleted"));
    }

    @GetMapping("/user")
    public ResponseEntity<ApiResponse<Page<JobApplicationResponse>>> getUserJobs(
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable,
            @RequestParam(defaultValue = "false") boolean archived,
            @RequestParam(required = false) ApplicationStatus status,
            @RequestParam(required = false) Priority priority,
            @RequestParam(required = false) String company,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String tag) {
        JobApplicationFilter filter = new JobApplicationFilter(archived, status, priority, company, keyword, tag);
        Page<JobApplicationResponse> applications = jobApplicationService.search(filter, pageable)
                .map(jobApplicationMapper::toResponse);
        return ResponseEntity.ok(ApiResponse.success("User job applications fetched", applications));
    }

    @PostMapping("/{jobId}/match/{resumeId}")
    public ResponseEntity<ApiResponse<String>> matchResume(@PathVariable Long jobId, @PathVariable Long resumeId) {
        String analysis = jobApplicationService.matchResumeWithJob(resumeId, jobId);
        return ResponseEntity.ok(ApiResponse.success("AI Matching completed", analysis));
    }

    @PostMapping("/{jobId}/tags/{tagId}")
    public ResponseEntity<ApiResponse<JobApplicationResponse>> addTag(@PathVariable Long jobId, @PathVariable Long tagId) {
        JobApplication updated = jobApplicationService.addTag(jobId, tagId);
        return ResponseEntity.ok(ApiResponse.success("Tag added", jobApplicationMapper.toResponse(updated)));
    }

    @DeleteMapping("/{jobId}/tags/{tagId}")
    public ResponseEntity<ApiResponse<JobApplicationResponse>> removeTag(@PathVariable Long jobId, @PathVariable Long tagId) {
        JobApplication updated = jobApplicationService.removeTag(jobId, tagId);
        return ResponseEntity.ok(ApiResponse.success("Tag removed", jobApplicationMapper.toResponse(updated)));
    }
}

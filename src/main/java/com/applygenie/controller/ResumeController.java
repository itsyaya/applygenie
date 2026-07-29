package com.applygenie.controller;

import com.applygenie.dto.response.ApiResponse;
import com.applygenie.dto.response.ResumeResponse;
import com.applygenie.entity.Resume;
import com.applygenie.mapper.ResumeMapper;
import com.applygenie.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/resume")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService resumeService;
    private final ResumeMapper resumeMapper;

    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<ResumeResponse>> uploadResume(@RequestParam("file") MultipartFile file) {
        Resume savedResume = resumeService.uploadResume(file);
        return ResponseEntity.ok(ApiResponse.success("Resume uploaded successfully", resumeMapper.toResponse(savedResume)));
    }

    @GetMapping("/user")
    public ResponseEntity<ApiResponse<Page<ResumeResponse>>> getUserResumes(
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<ResumeResponse> resumes = resumeService.getUserResumes(pageable).map(resumeMapper::toResponse);
        return ResponseEntity.ok(ApiResponse.success("User resumes fetched", resumes));
    }
}

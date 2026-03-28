package com.applygenie.controller;

import com.applygenie.dto.response.ApiResponse;
import com.applygenie.entity.Resume;
import com.applygenie.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/resume")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService resumeService;

    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<Resume>> uploadResume(@RequestParam("file") MultipartFile file) {
        Resume savedResume = resumeService.uploadResume(file);
        return ResponseEntity.ok(new ApiResponse<>(true, "Resume uploaded successfully", savedResume));
    }

    @GetMapping("/user")
    public ResponseEntity<ApiResponse<org.springframework.data.domain.Page<Resume>>> getUserResumes(
            @org.springframework.data.web.PageableDefault(size = 10, sort = "createdAt", direction = org.springframework.data.domain.Sort.Direction.DESC) 
            org.springframework.data.domain.Pageable pageable) {
        org.springframework.data.domain.Page<Resume> resumes = resumeService.getUserResumes(pageable);
        return ResponseEntity.ok(new ApiResponse<>(true, "User resumes fetched", resumes));
    }
}

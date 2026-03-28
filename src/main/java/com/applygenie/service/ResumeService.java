package com.applygenie.service;

import com.applygenie.entity.Resume;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ResumeService {
    Resume uploadResume(MultipartFile file);
    org.springframework.data.domain.Page<Resume> getUserResumes(org.springframework.data.domain.Pageable pageable);
}

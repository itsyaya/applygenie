package com.applygenie.service;

import com.applygenie.entity.Resume;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ResumeService {
    Resume uploadResume(MultipartFile file);
    List<Resume> getUserResumes();
}

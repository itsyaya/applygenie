package com.applygenie.service;

import com.applygenie.entity.Resume;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface ResumeService {
    Resume uploadResume(MultipartFile file);

    Resume replaceResume(Long id, MultipartFile file);

    void deleteResume(Long id);

    byte[] downloadResume(Long id);

    Resume getOwnedResume(Long id);

    Page<Resume> getUserResumes(Pageable pageable);
}

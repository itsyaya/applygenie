package com.applygenie.service.impl;

import com.applygenie.entity.Resume;
import com.applygenie.entity.User;
import com.applygenie.repository.ResumeRepository;
import com.applygenie.security.CurrentUserService;
import com.applygenie.service.ResumeParserService;
import com.applygenie.service.ResumeService;
import com.applygenie.service.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class ResumeServiceImpl implements ResumeService {

    private final ResumeRepository resumeRepository;
    private final CurrentUserService currentUserService;
    private final StorageService storageService;
    private final ResumeParserService resumeParserService;

    @Override
    @Transactional
    public Resume uploadResume(MultipartFile file) {
        String originalFilename = file.getOriginalFilename();
        try {
            // 1. Upload to S3
            String s3Key = storageService.uploadFile(file);

            // 2. Parse text with Tika
            String parsedText = resumeParserService.parseResume(file);

            // 3. Save to DB
            User currentUser = currentUserService.getCurrentUser();
            Resume resume = Resume.builder()
                    .user(currentUser)
                    .fileName(originalFilename)
                    .s3Key(s3Key)
                    .parsedText(parsedText)
                    .build();

            return resumeRepository.save(resume);

        } catch (IOException e) {
            throw new RuntimeException("Failed to process resume upload: " + originalFilename, e);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public org.springframework.data.domain.Page<Resume> getUserResumes(org.springframework.data.domain.Pageable pageable) {
        return resumeRepository.findByUserId(currentUserService.getCurrentUser().getId(), pageable);
    }
}

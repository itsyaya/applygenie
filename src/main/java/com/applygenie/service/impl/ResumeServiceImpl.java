package com.applygenie.service.impl;

import com.applygenie.entity.Resume;
import com.applygenie.entity.User;
import com.applygenie.repository.ResumeRepository;
import com.applygenie.repository.UserRepository;
import com.applygenie.security.CustomUserDetails;
import com.applygenie.service.ResumeParserService;
import com.applygenie.service.ResumeService;
import com.applygenie.service.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ResumeServiceImpl implements ResumeService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;
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
            User currentUser = getCurrentUser();
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
    public org.springframework.data.domain.Page<Resume> getUserResumes(org.springframework.data.domain.Pageable pageable) {
        return resumeRepository.findByUserId(getCurrentUser().getId(), pageable);
    }

    private User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = ((CustomUserDetails) principal).getUsername();
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}

package com.applygenie.service.impl;

import com.applygenie.entity.Resume;
import com.applygenie.entity.User;
import com.applygenie.exception.custom.InvalidFileException;
import com.applygenie.exception.custom.ResourceNotFoundException;
import com.applygenie.exception.custom.UnauthorizedAccessException;
import com.applygenie.repository.ResumeRepository;
import com.applygenie.security.CurrentUserService;
import com.applygenie.service.ResumeParserService;
import com.applygenie.service.ResumeService;
import com.applygenie.service.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ResumeServiceImpl implements ResumeService {

    private static final Set<String> ALLOWED_CONTENT_TYPES = Set.of(
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    private static final long MAX_FILE_SIZE_BYTES = 5L * 1024 * 1024;

    private final ResumeRepository resumeRepository;
    private final CurrentUserService currentUserService;
    private final StorageService storageService;
    private final ResumeParserService resumeParserService;

    @Override
    @Transactional
    public Resume uploadResume(MultipartFile file) {
        validateFile(file);
        String originalFilename = file.getOriginalFilename();
        try {
            String s3Key = storageService.uploadFile(file);
            String parsedText = resumeParserService.parseResume(file);

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
    @Transactional
    public Resume replaceResume(Long id, MultipartFile file) {
        validateFile(file);
        Resume resume = getOwnedResume(id);
        String oldKey = resume.getS3Key();

        try {
            String newKey = storageService.uploadFile(file);
            String parsedText = resumeParserService.parseResume(file);

            resume.setFileName(file.getOriginalFilename());
            resume.setS3Key(newKey);
            resume.setParsedText(parsedText);
            Resume saved = resumeRepository.save(resume);

            storageService.deleteFile(oldKey);
            return saved;
        } catch (IOException e) {
            throw new RuntimeException("Failed to process resume replacement: " + file.getOriginalFilename(), e);
        }
    }

    @Override
    @Transactional
    public void deleteResume(Long id) {
        Resume resume = getOwnedResume(id);
        storageService.deleteFile(resume.getS3Key());
        resumeRepository.delete(resume);
    }

    @Override
    @Transactional(readOnly = true)
    public byte[] downloadResume(Long id) {
        Resume resume = getOwnedResume(id);
        try {
            return storageService.downloadFile(resume.getS3Key());
        } catch (IOException e) {
            throw new RuntimeException("Failed to download resume: " + resume.getFileName(), e);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Resume getOwnedResume(Long id) {
        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resume not found"));
        Long currentUserId = currentUserService.getCurrentUser().getId();
        if (!resume.getUser().getId().equals(currentUserId)) {
            throw new UnauthorizedAccessException("Unauthorized to access this resume");
        }
        return resume;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Resume> getUserResumes(Pageable pageable) {
        return resumeRepository.findByUserId(currentUserService.getCurrentUser().getId(), pageable);
    }

    private void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new InvalidFileException("File is required");
        }
        if (file.getSize() > MAX_FILE_SIZE_BYTES) {
            throw new InvalidFileException("File exceeds the maximum allowed size of 5MB");
        }
        if (!ALLOWED_CONTENT_TYPES.contains(file.getContentType())) {
            throw new InvalidFileException("Unsupported file type. Only PDF, DOC, and DOCX files are allowed");
        }
    }
}

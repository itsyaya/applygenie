package com.applygenie.service.impl;

import com.applygenie.dto.request.UpdateProfileRequest;
import com.applygenie.entity.Resume;
import com.applygenie.entity.User;
import com.applygenie.exception.custom.InvalidFileException;
import com.applygenie.exception.custom.ResourceNotFoundException;
import com.applygenie.exception.custom.UnauthorizedAccessException;
import com.applygenie.repository.ResumeRepository;
import com.applygenie.repository.UserRepository;
import com.applygenie.security.CurrentUserService;
import com.applygenie.service.ProfileService;
import com.applygenie.service.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private static final Set<String> ALLOWED_IMAGE_TYPES = Set.of("image/jpeg", "image/png", "image/webp");
    private static final long MAX_IMAGE_SIZE_BYTES = 2L * 1024 * 1024;

    private final UserRepository userRepository;
    private final ResumeRepository resumeRepository;
    private final CurrentUserService currentUserService;
    private final StorageService storageService;

    @Override
    @Transactional(readOnly = true)
    public User getProfile() {
        return currentUserService.getCurrentUser();
    }

    @Override
    @Transactional
    public User updateProfile(UpdateProfileRequest request) {
        User currentUser = currentUserService.getCurrentUser();

        currentUser.setBio(request.bio());
        currentUser.setLocation(request.location());
        currentUser.setLinkedinUrl(request.linkedinUrl());
        currentUser.setGithubUrl(request.githubUrl());
        currentUser.setPortfolioUrl(request.portfolioUrl());

        if (request.preferredResumeId() == null) {
            currentUser.setPreferredResume(null);
        } else {
            Resume resume = resumeRepository.findById(request.preferredResumeId())
                    .orElseThrow(() -> new ResourceNotFoundException("Resume not found"));
            if (!resume.getUser().getId().equals(currentUser.getId())) {
                throw new UnauthorizedAccessException("Unauthorized to access this resume");
            }
            currentUser.setPreferredResume(resume);
        }

        return userRepository.save(currentUser);
    }

    @Override
    @Transactional
    public User uploadProfileImage(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new InvalidFileException("File is required");
        }
        if (file.getSize() > MAX_IMAGE_SIZE_BYTES) {
            throw new InvalidFileException("Image exceeds the maximum allowed size of 2MB");
        }
        if (!ALLOWED_IMAGE_TYPES.contains(file.getContentType())) {
            throw new InvalidFileException("Unsupported image type. Only JPEG, PNG, and WEBP are allowed");
        }

        User currentUser = currentUserService.getCurrentUser();
        String oldKey = currentUser.getProfileImageKey();
        try {
            String newKey = storageService.uploadFile(file);
            currentUser.setProfileImageKey(newKey);
            User saved = userRepository.save(currentUser);
            if (oldKey != null) {
                storageService.deleteFile(oldKey);
            }
            return saved;
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload profile image", e);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public byte[] downloadProfileImage() {
        User currentUser = currentUserService.getCurrentUser();
        if (currentUser.getProfileImageKey() == null) {
            throw new ResourceNotFoundException("No profile image set");
        }
        try {
            return storageService.downloadFile(currentUser.getProfileImageKey());
        } catch (IOException e) {
            throw new RuntimeException("Failed to download profile image", e);
        }
    }
}

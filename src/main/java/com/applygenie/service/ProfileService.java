package com.applygenie.service;

import com.applygenie.dto.request.UpdateProfileRequest;
import com.applygenie.entity.User;
import org.springframework.web.multipart.MultipartFile;

public interface ProfileService {
    User getProfile();

    User updateProfile(UpdateProfileRequest request);

    User uploadProfileImage(MultipartFile file);

    byte[] downloadProfileImage();
}

package com.applygenie.controller;

import com.applygenie.dto.request.UpdateProfileRequest;
import com.applygenie.dto.response.ApiResponse;
import com.applygenie.dto.response.UserProfileResponse;
import com.applygenie.entity.User;
import com.applygenie.mapper.UserMapper;
import com.applygenie.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;
    private final UserMapper userMapper;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserProfileResponse>> getProfile() {
        User user = profileService.getProfile();
        return ResponseEntity.ok(ApiResponse.success("Profile fetched", userMapper.toProfileResponse(user)));
    }

    @PutMapping
    public ResponseEntity<ApiResponse<UserProfileResponse>> updateProfile(@Valid @RequestBody UpdateProfileRequest request) {
        User updated = profileService.updateProfile(request);
        return ResponseEntity.ok(ApiResponse.success("Profile updated", userMapper.toProfileResponse(updated)));
    }

    @PostMapping("/image")
    public ResponseEntity<ApiResponse<UserProfileResponse>> uploadProfileImage(@RequestParam("file") MultipartFile file) {
        User updated = profileService.uploadProfileImage(file);
        return ResponseEntity.ok(ApiResponse.success("Profile image uploaded", userMapper.toProfileResponse(updated)));
    }

    @GetMapping("/image")
    public ResponseEntity<byte[]> downloadProfileImage() {
        byte[] content = profileService.downloadProfileImage();
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_OCTET_STREAM).body(content);
    }
}

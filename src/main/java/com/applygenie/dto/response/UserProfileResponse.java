package com.applygenie.dto.response;

import com.applygenie.entity.SubscriptionTier;

import java.time.LocalDateTime;

public record UserProfileResponse(
        Long id,
        String email,
        String bio,
        String location,
        String linkedinUrl,
        String githubUrl,
        String portfolioUrl,
        String profileImageKey,
        Long preferredResumeId,
        SubscriptionTier subscriptionTier,
        boolean subscriptionActive,
        LocalDateTime createdAt
) {
}

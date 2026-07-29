package com.applygenie.dto.request;

import jakarta.validation.constraints.Size;

public record UpdateProfileRequest(
        @Size(max = 2000, message = "Bio must be at most 2000 characters")
        String bio,

        String location,
        String linkedinUrl,
        String githubUrl,
        String portfolioUrl,
        Long preferredResumeId
) {
}

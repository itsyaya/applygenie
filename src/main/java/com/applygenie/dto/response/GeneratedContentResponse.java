package com.applygenie.dto.response;

import com.applygenie.entity.GenerationStatus;

import java.time.LocalDateTime;

public record GeneratedContentResponse(
        Long id,
        Long resumeId,
        Long jobId,
        String coverLetter,
        String cvSummary,
        GenerationStatus status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}

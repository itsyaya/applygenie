package com.applygenie.dto.response;

import java.time.LocalDateTime;

public record JobDescriptionResponse(
        Long id,
        String title,
        String description,
        String company,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}

package com.applygenie.dto.response;

import java.time.LocalDateTime;

public record ResumeResponse(
        Long id,
        String fileName,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}

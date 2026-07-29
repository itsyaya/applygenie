package com.applygenie.dto.request;

import jakarta.validation.constraints.NotNull;

public record GenerationRequest(
        @NotNull(message = "Resume ID is required")
        Long resumeId,

        @NotNull(message = "Job Description ID is required")
        Long jobId
) {
}

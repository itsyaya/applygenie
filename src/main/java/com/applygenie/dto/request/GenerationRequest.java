package com.applygenie.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class GenerationRequest {
    @NotNull(message = "Resume ID is required")
    private Long resumeId;

    @NotNull(message = "Job Description ID is required")
    private Long jobId;
}

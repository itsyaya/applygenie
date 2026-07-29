package com.applygenie.dto.request;

import com.applygenie.entity.ApplicationStatus;
import jakarta.validation.constraints.NotNull;

public record UpdateApplicationStatusRequest(
        @NotNull(message = "Status is required")
        ApplicationStatus status
) {
}

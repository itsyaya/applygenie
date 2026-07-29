package com.applygenie.dto.request;

import jakarta.validation.constraints.NotBlank;

public record JobDescriptionRequest(
        @NotBlank(message = "Title is required")
        String title,

        @NotBlank(message = "Description is required")
        String description,

        String company
) {
}

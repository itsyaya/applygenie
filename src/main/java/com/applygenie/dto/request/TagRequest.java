package com.applygenie.dto.request;

import jakarta.validation.constraints.NotBlank;

public record TagRequest(
        @NotBlank(message = "Name is required")
        String name,

        String color
) {
}

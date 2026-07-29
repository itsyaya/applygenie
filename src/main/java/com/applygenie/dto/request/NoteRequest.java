package com.applygenie.dto.request;

import jakarta.validation.constraints.NotBlank;

public record NoteRequest(
        @NotBlank(message = "Content is required")
        String content
) {
}

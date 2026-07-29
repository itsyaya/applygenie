package com.applygenie.dto.request;

import com.applygenie.entity.ApplicationStatus;
import com.applygenie.entity.Priority;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

public record JobApplicationRequest(
        @NotBlank(message = "Title is required")
        String title,

        @NotBlank(message = "Description is required")
        String description,

        String company,
        String location,
        String salary,
        String recruiter,
        ApplicationStatus status,
        Priority priority,
        Long resumeId,
        LocalDate applicationDate,
        LocalDate interviewDate,
        LocalDate followUpDate,
        LocalDate offerDate,
        LocalDate rejectionDate
) {
}

package com.applygenie.dto.response;

import com.applygenie.entity.ApplicationStatus;
import com.applygenie.entity.Priority;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

public record JobApplicationResponse(
        Long id,
        String title,
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
        LocalDate rejectionDate,
        boolean archived,
        Set<TagResponse> tags,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}

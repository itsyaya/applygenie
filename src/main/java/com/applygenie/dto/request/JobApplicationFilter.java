package com.applygenie.dto.request;

import com.applygenie.entity.ApplicationStatus;
import com.applygenie.entity.Priority;

public record JobApplicationFilter(
        boolean archived,
        ApplicationStatus status,
        Priority priority,
        String company,
        String keyword,
        String tag
) {
}

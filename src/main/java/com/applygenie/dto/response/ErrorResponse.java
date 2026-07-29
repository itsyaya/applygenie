package com.applygenie.dto.response;

import java.time.LocalDateTime;
import java.util.Map;

public record ErrorResponse(boolean success, String message, LocalDateTime timestamp, Map<String, String> errors) {
}

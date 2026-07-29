package com.applygenie.dto.response;

public record AuthResponse(String token, String refreshToken, String email, String type) {

    public static AuthResponse of(String token, String refreshToken, String email) {
        return new AuthResponse(token, refreshToken, email, "Bearer");
    }
}

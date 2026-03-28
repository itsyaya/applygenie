package com.applygenie.controller;

import com.applygenie.dto.request.LoginRequest;
import com.applygenie.dto.request.RegisterRequest;
import com.applygenie.dto.response.ApiResponse;
import com.applygenie.dto.response.AuthResponse;
import com.applygenie.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final com.applygenie.security.JwtUtils jwtUtils;
    private final com.applygenie.service.RefreshTokenService refreshTokenService;
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(true, "User registered successfully", response));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(new ApiResponse<>(true, "Login successful", response));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<ApiResponse<com.applygenie.dto.response.TokenRefreshResponse>> refreshToken(
            @Valid @RequestBody com.applygenie.dto.request.TokenRefreshRequest request) {
        String requestRefreshToken = request.getRefreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(com.applygenie.entity.RefreshToken::getUser)
                .map(user -> {
                    String token = jwtUtils.generateToken(new com.applygenie.security.CustomUserDetails(user));
                    return ResponseEntity.ok(new ApiResponse<>(true, "Token refreshed successfully",
                            com.applygenie.dto.response.TokenRefreshResponse.builder()
                                    .accessToken(token)
                                    .refreshToken(requestRefreshToken)
                                    .build()));
                })
                .orElseThrow(() -> new RuntimeException("Refresh token is not in database!"));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logoutUser(@RequestParam Long userId) {
        refreshTokenService.deleteByUserId(userId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Log out successful", null));
    }
}

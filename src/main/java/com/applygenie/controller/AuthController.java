package com.applygenie.controller;

import com.applygenie.dto.request.LoginRequest;
import com.applygenie.dto.request.RegisterRequest;
import com.applygenie.dto.request.TokenRefreshRequest;
import com.applygenie.dto.response.ApiResponse;
import com.applygenie.dto.response.AuthResponse;
import com.applygenie.dto.response.TokenRefreshResponse;
import com.applygenie.exception.custom.ResourceNotFoundException;
import com.applygenie.security.CustomUserDetails;
import com.applygenie.security.JwtUtils;
import com.applygenie.service.AuthService;
import com.applygenie.service.RefreshTokenService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtUtils jwtUtils;
    private final RefreshTokenService refreshTokenService;
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("User registered successfully", response));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success("Login successful", response));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<ApiResponse<TokenRefreshResponse>> refreshToken(
            @Valid @RequestBody TokenRefreshRequest request) {
        String requestRefreshToken = request.refreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(com.applygenie.entity.RefreshToken::getUser)
                .map(user -> {
                    String token = jwtUtils.generateToken(new CustomUserDetails(user));
                    return ResponseEntity.ok(ApiResponse.success("Token refreshed successfully",
                            TokenRefreshResponse.of(token, requestRefreshToken)));
                })
                .orElseThrow(() -> new ResourceNotFoundException("Refresh token not found or invalid"));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logoutUser(@AuthenticationPrincipal CustomUserDetails userDetails) {
        refreshTokenService.deleteByUserId(userDetails.getUser().getId());
        return ResponseEntity.ok(ApiResponse.success("Log out successful"));
    }
}

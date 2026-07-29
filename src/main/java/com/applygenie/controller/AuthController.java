package com.applygenie.controller;

import com.applygenie.dto.request.ChangePasswordRequest;
import com.applygenie.dto.request.ForgotPasswordRequest;
import com.applygenie.dto.request.LoginRequest;
import com.applygenie.dto.request.RegisterRequest;
import com.applygenie.dto.request.ResetPasswordRequest;
import com.applygenie.dto.request.TokenRefreshRequest;
import com.applygenie.dto.response.ApiResponse;
import com.applygenie.dto.response.AuthResponse;
import com.applygenie.dto.response.TokenRefreshResponse;
import com.applygenie.entity.RefreshToken;
import com.applygenie.exception.custom.ResourceNotFoundException;
import com.applygenie.security.CustomUserDetails;
import com.applygenie.security.JwtUtils;
import com.applygenie.security.TokenBlacklistService;
import com.applygenie.service.AuthService;
import com.applygenie.service.RefreshTokenService;
import jakarta.servlet.http.HttpServletRequest;
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
    private final TokenBlacklistService tokenBlacklistService;

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
        RefreshToken validToken = refreshTokenService.findByToken(request.refreshToken())
                .map(refreshTokenService::verifyExpiration)
                .orElseThrow(() -> new ResourceNotFoundException("Refresh token not found or invalid"));

        RefreshToken rotated = refreshTokenService.rotateRefreshToken(validToken);
        String accessToken = jwtUtils.generateToken(new CustomUserDetails(rotated.getUser()));

        return ResponseEntity.ok(ApiResponse.success("Token refreshed successfully",
                TokenRefreshResponse.of(accessToken, rotated.getToken())));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logoutUser(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            HttpServletRequest request) {
        refreshTokenService.deleteByUserId(userDetails.getUser().getId());
        jwtUtils.resolveToken(request).ifPresent(token ->
                tokenBlacklistService.blacklist(jwtUtils.getJwtIdFromToken(token), jwtUtils.getRemainingValidity(token)));
        return ResponseEntity.ok(ApiResponse.success("Log out successful"));
    }

    @PutMapping("/change-password")
    public ResponseEntity<ApiResponse<Void>> changePassword(@Valid @RequestBody ChangePasswordRequest request) {
        authService.changePassword(request);
        return ResponseEntity.ok(ApiResponse.success("Password changed successfully"));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<Void>> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        authService.forgotPassword(request);
        return ResponseEntity.ok(ApiResponse.success("If that email is registered, a reset link has been sent"));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Void>> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        authService.resetPassword(request);
        return ResponseEntity.ok(ApiResponse.success("Password reset successfully"));
    }

    @GetMapping("/verify-email")
    public ResponseEntity<ApiResponse<Void>> verifyEmail(@RequestParam String token) {
        authService.verifyEmail(token);
        return ResponseEntity.ok(ApiResponse.success("Email verified successfully"));
    }

    @PostMapping("/verify-email/resend")
    public ResponseEntity<ApiResponse<Void>> resendVerificationEmail() {
        authService.resendVerificationEmail();
        return ResponseEntity.ok(ApiResponse.success("Verification email sent"));
    }
}

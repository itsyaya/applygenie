package com.applygenie.service;

import com.applygenie.dto.request.ChangePasswordRequest;
import com.applygenie.dto.request.ForgotPasswordRequest;
import com.applygenie.dto.request.LoginRequest;
import com.applygenie.dto.request.RegisterRequest;
import com.applygenie.dto.request.ResetPasswordRequest;
import com.applygenie.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    void changePassword(ChangePasswordRequest request);

    void forgotPassword(ForgotPasswordRequest request);

    void resetPassword(ResetPasswordRequest request);

    void verifyEmail(String token);

    void resendVerificationEmail();
}

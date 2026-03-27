package com.applygenie.service;

import com.applygenie.dto.request.LoginRequest;
import com.applygenie.dto.request.RegisterRequest;
import com.applygenie.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}

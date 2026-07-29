package com.applygenie.service.impl;

import com.applygenie.config.properties.AppProperties;
import com.applygenie.dto.request.ChangePasswordRequest;
import com.applygenie.dto.request.ForgotPasswordRequest;
import com.applygenie.dto.request.LoginRequest;
import com.applygenie.dto.request.RegisterRequest;
import com.applygenie.dto.request.ResetPasswordRequest;
import com.applygenie.dto.response.AuthResponse;
import com.applygenie.entity.Role;
import com.applygenie.entity.User;
import com.applygenie.entity.VerificationToken;
import com.applygenie.entity.VerificationTokenType;
import com.applygenie.exception.custom.InvalidCredentialsException;
import com.applygenie.exception.custom.InvalidTokenException;
import com.applygenie.exception.custom.ResourceAlreadyExistsException;
import com.applygenie.repository.UserRepository;
import com.applygenie.repository.VerificationTokenRepository;
import com.applygenie.security.CurrentUserService;
import com.applygenie.security.CustomUserDetails;
import com.applygenie.security.JwtUtils;
import com.applygenie.service.AuthService;
import com.applygenie.service.EmailService;
import com.applygenie.service.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private static final Duration EMAIL_VERIFICATION_TTL = Duration.ofHours(24);
    private static final Duration PASSWORD_RESET_TTL = Duration.ofHours(1);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final RefreshTokenService refreshTokenService;
    private final AuthenticationManager authenticationManager;
    private final VerificationTokenRepository verificationTokenRepository;
    private final CurrentUserService currentUserService;
    private final EmailService emailService;
    private final AppProperties appProperties;

    @Override
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new ResourceAlreadyExistsException("Email is already in use!");
        }

        User user = User.builder()
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .role(Role.USER)
                .build();

        userRepository.save(user);
        sendVerificationEmail(user);

        CustomUserDetails userDetails = new CustomUserDetails(user);
        String jwt = jwtUtils.generateToken(userDetails);
        com.applygenie.entity.RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());

        return AuthResponse.of(jwt, refreshToken.getToken(), user.getEmail());
    }

    @Override
    @Transactional
    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        String jwt = jwtUtils.generateToken(userDetails);

        // Ensure only one active refresh token exists per user (or rotate if existing)
        refreshTokenService.deleteByUserId(userDetails.getUser().getId());
        com.applygenie.entity.RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getUser().getId());

        return AuthResponse.of(jwt, refreshToken.getToken(), userDetails.getUsername());
    }

    @Override
    @Transactional
    public void changePassword(ChangePasswordRequest request) {
        User currentUser = currentUserService.getCurrentUser();
        if (!passwordEncoder.matches(request.currentPassword(), currentUser.getPassword())) {
            throw new InvalidCredentialsException("Current password is incorrect");
        }
        currentUser.setPassword(passwordEncoder.encode(request.newPassword()));
        userRepository.save(currentUser);
        refreshTokenService.deleteByUserId(currentUser.getId());
    }

    @Override
    @Transactional
    public void forgotPassword(ForgotPasswordRequest request) {
        // Always return normally regardless of whether the email is registered, to avoid enumeration.
        userRepository.findByEmail(request.email()).ifPresent(user -> {
            String token = issueToken(user, VerificationTokenType.PASSWORD_RESET, PASSWORD_RESET_TTL);
            String link = appProperties.frontend().url() + "/reset-password?token=" + token;
            emailService.sendPasswordReset(user.getEmail(), link);
        });
    }

    @Override
    @Transactional
    public void resetPassword(ResetPasswordRequest request) {
        VerificationToken verificationToken = consumeToken(request.token(), VerificationTokenType.PASSWORD_RESET);
        User user = verificationToken.getUser();
        user.setPassword(passwordEncoder.encode(request.newPassword()));
        userRepository.save(user);
        refreshTokenService.deleteByUserId(user.getId());
    }

    @Override
    @Transactional
    public void verifyEmail(String token) {
        VerificationToken verificationToken = consumeToken(token, VerificationTokenType.EMAIL_VERIFICATION);
        User user = verificationToken.getUser();
        user.setEmailVerified(true);
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void resendVerificationEmail() {
        User currentUser = currentUserService.getCurrentUser();
        if (currentUser.isEmailVerified()) {
            throw new IllegalStateException("Email is already verified");
        }
        sendVerificationEmail(currentUser);
    }

    private void sendVerificationEmail(User user) {
        String token = issueToken(user, VerificationTokenType.EMAIL_VERIFICATION, EMAIL_VERIFICATION_TTL);
        String link = appProperties.frontend().url() + "/verify-email?token=" + token;
        emailService.sendEmailVerification(user.getEmail(), link);
    }

    private String issueToken(User user, VerificationTokenType type, Duration ttl) {
        verificationTokenRepository.deleteByUserAndType(user, type);
        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = VerificationToken.builder()
                .user(user)
                .token(token)
                .type(type)
                .expiryDate(Instant.now().plus(ttl))
                .build();
        verificationTokenRepository.save(verificationToken);
        return token;
    }

    private VerificationToken consumeToken(String token, VerificationTokenType type) {
        VerificationToken verificationToken = verificationTokenRepository.findByTokenAndType(token, type)
                .orElseThrow(() -> new InvalidTokenException("Invalid or expired token"));
        if (verificationToken.getExpiryDate().isBefore(Instant.now())) {
            verificationTokenRepository.delete(verificationToken);
            throw new InvalidTokenException("Invalid or expired token");
        }
        verificationTokenRepository.delete(verificationToken);
        return verificationToken;
    }
}

package com.applygenie.service.impl;

import com.applygenie.service.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

// No SMTP/SES provider configured yet - swap this for a real EmailService impl when one is wired up.
@Service
@Slf4j
public class LoggingEmailServiceImpl implements EmailService {

    @Override
    public void sendEmailVerification(String toEmail, String verificationLink) {
        log.info("[email-stub] Verification email for {}: {}", toEmail, verificationLink);
    }

    @Override
    public void sendPasswordReset(String toEmail, String resetLink) {
        log.info("[email-stub] Password reset email for {}: {}", toEmail, resetLink);
    }
}

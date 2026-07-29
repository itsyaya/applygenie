package com.applygenie.service;

public interface EmailService {
    void sendEmailVerification(String toEmail, String verificationLink);

    void sendPasswordReset(String toEmail, String resetLink);
}

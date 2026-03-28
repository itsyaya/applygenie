package com.applygenie.service;

import com.applygenie.entity.RefreshToken;

import java.util.Optional;

public interface RefreshTokenService {
    Optional<RefreshToken> findByToken(String token);
    RefreshToken createRefreshToken(Long userId);
    RefreshToken verifyExpiration(RefreshToken token);
    RefreshToken rotateRefreshToken(RefreshToken token);
    int deleteByUserId(Long userId);
}

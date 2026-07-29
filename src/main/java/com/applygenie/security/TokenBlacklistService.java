package com.applygenie.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
@Slf4j
public class TokenBlacklistService {

    private static final String KEY_PREFIX = "blacklist:jwt:";

    private final StringRedisTemplate redisTemplate;

    public void blacklist(String jwtId, Duration ttl) {
        if (jwtId == null || ttl.isNegative() || ttl.isZero()) {
            return;
        }
        try {
            redisTemplate.opsForValue().set(KEY_PREFIX + jwtId, "revoked", ttl);
        } catch (Exception e) {
            log.warn("Failed to blacklist token in Redis; revocation not enforced for this token: {}", e.getMessage());
        }
    }

    public boolean isBlacklisted(String jwtId) {
        if (jwtId == null) {
            return false;
        }
        try {
            return Boolean.TRUE.equals(redisTemplate.hasKey(KEY_PREFIX + jwtId));
        } catch (Exception e) {
            log.warn("Failed to check token blacklist in Redis; failing open (request allowed): {}", e.getMessage());
            return false;
        }
    }
}

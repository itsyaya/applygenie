package com.applygenie.service;

import com.applygenie.entity.User;
import com.applygenie.repository.GeneratedContentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsageService {

    private final GeneratedContentRepository generatedContentRepository;

    private static final int FREE_TIER_LIMIT = 5;
    private static final int PRO_TIER_LIMIT = 100;

    public boolean canGenerate(User user) {
        if (com.applygenie.entity.SubscriptionTier.PRO.equals(user.getSubscriptionTier()) && user.isSubscriptionActive()) {
            long count = generatedContentRepository.countByUserId(user.getId());
            return count < PRO_TIER_LIMIT;
        }
        
        // Default to Free tier limits
        long count = generatedContentRepository.countByUserId(user.getId());
        return count < FREE_TIER_LIMIT;
    }

    public int getRemainingCredits(User user) {
        long count = generatedContentRepository.countByUserId(user.getId());
        int limit = (com.applygenie.entity.SubscriptionTier.PRO.equals(user.getSubscriptionTier()) && user.isSubscriptionActive()) 
                    ? PRO_TIER_LIMIT : FREE_TIER_LIMIT;
        return Math.max(0, limit - (int) count);
    }
}

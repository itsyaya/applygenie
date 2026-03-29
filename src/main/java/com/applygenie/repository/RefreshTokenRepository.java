package com.applygenie.repository;

import com.applygenie.entity.RefreshToken;
import com.applygenie.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);
    
    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @org.springframework.data.jpa.repository.Query("DELETE FROM RefreshToken rt WHERE rt.user = :user")
    int deleteByUser(User user);
}

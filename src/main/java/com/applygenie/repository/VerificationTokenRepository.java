package com.applygenie.repository;

import com.applygenie.entity.User;
import com.applygenie.entity.VerificationToken;
import com.applygenie.entity.VerificationTokenType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
    Optional<VerificationToken> findByTokenAndType(String token, VerificationTokenType type);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @org.springframework.data.jpa.repository.Query(
            "DELETE FROM VerificationToken vt WHERE vt.user = :user AND vt.type = :type")
    void deleteByUserAndType(User user, VerificationTokenType type);
}

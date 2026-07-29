package com.applygenie.repository;

import com.applygenie.entity.GeneratedContent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GeneratedContentRepository extends JpaRepository<GeneratedContent, Long> {
    Page<GeneratedContent> findByUserId(Long userId, Pageable pageable);
    long countByUserId(Long userId);
}

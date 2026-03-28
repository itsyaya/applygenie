package com.applygenie.repository;

import com.applygenie.entity.GeneratedContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GeneratedContentRepository extends JpaRepository<GeneratedContent, Long> {
    List<GeneratedContent> findByUserId(Long userId);
    long countByUserId(Long userId);
}

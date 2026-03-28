package com.applygenie.repository;

import com.applygenie.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {
    org.springframework.data.domain.Page<Resume> findByUserId(Long userId, org.springframework.data.domain.Pageable pageable);
}

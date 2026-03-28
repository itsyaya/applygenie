package com.applygenie.repository;

import com.applygenie.entity.JobDescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobDescriptionRepository extends JpaRepository<JobDescription, Long> {
    org.springframework.data.domain.Page<JobDescription> findByUserId(Long userId, org.springframework.data.domain.Pageable pageable);
}

package com.applygenie.repository;

import com.applygenie.entity.ApplicationStatus;
import com.applygenie.entity.JobApplication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long>, JpaSpecificationExecutor<JobApplication> {

    Page<JobApplication> findByUserId(Long userId, Pageable pageable);

    long countByUserIdAndArchivedFalse(Long userId);

    long countByUserIdAndCreatedAtAfterAndArchivedFalse(Long userId, LocalDateTime after);

    long countByUserIdAndStatusInAndArchivedFalse(Long userId, java.util.Collection<ApplicationStatus> statuses);

    long countByUserIdAndStatusNotInAndArchivedFalse(Long userId, java.util.Collection<ApplicationStatus> statuses);
}

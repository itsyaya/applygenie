package com.applygenie.service.impl;

import com.applygenie.dto.response.DashboardStatsResponse;
import com.applygenie.entity.ApplicationStatus;
import com.applygenie.repository.JobApplicationRepository;
import com.applygenie.security.CurrentUserService;
import com.applygenie.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.EnumSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DashboardServiceImpl implements DashboardService {

    private static final Set<ApplicationStatus> INTERVIEW_STATUSES = EnumSet.of(
            ApplicationStatus.HR_SCREEN, ApplicationStatus.ASSESSMENT,
            ApplicationStatus.TECHNICAL_INTERVIEW, ApplicationStatus.FINAL_INTERVIEW);

    private static final Set<ApplicationStatus> OFFER_STATUSES = EnumSet.of(
            ApplicationStatus.OFFER, ApplicationStatus.ACCEPTED);

    private static final Set<ApplicationStatus> NOT_YET_SUBMITTED = EnumSet.of(ApplicationStatus.WISHLIST);

    private static final Set<ApplicationStatus> NO_RESPONSE_YET = EnumSet.of(
            ApplicationStatus.WISHLIST, ApplicationStatus.APPLIED);

    private final JobApplicationRepository jobApplicationRepository;
    private final CurrentUserService currentUserService;

    @Override
    public DashboardStatsResponse getStats() {
        Long userId = currentUserService.getCurrentUser().getId();

        long total = jobApplicationRepository.countByUserIdAndArchivedFalse(userId);
        LocalDateTime startOfMonth = LocalDate.now().withDayOfMonth(1).atStartOfDay();
        long thisMonth = jobApplicationRepository.countByUserIdAndCreatedAtAfterAndArchivedFalse(userId, startOfMonth);
        long interviews = jobApplicationRepository.countByUserIdAndStatusInAndArchivedFalse(userId, INTERVIEW_STATUSES);
        long offers = jobApplicationRepository.countByUserIdAndStatusInAndArchivedFalse(userId, OFFER_STATUSES);

        // "Submitted" excludes Wishlist entries that were never actually applied to.
        long submitted = total - jobApplicationRepository.countByUserIdAndStatusInAndArchivedFalse(userId, NOT_YET_SUBMITTED);
        long responded = total - jobApplicationRepository.countByUserIdAndStatusInAndArchivedFalse(userId, NO_RESPONSE_YET);
        long accepted = jobApplicationRepository.countByUserIdAndStatusInAndArchivedFalse(userId, EnumSet.of(ApplicationStatus.ACCEPTED));

        double acceptanceRate = submitted == 0 ? 0.0 : (accepted * 100.0 / submitted);
        double responseRate = submitted == 0 ? 0.0 : (responded * 100.0 / submitted);

        return new DashboardStatsResponse(total, thisMonth, interviews, offers, acceptanceRate, responseRate);
    }
}

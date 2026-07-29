package com.applygenie.dto.response;

public record DashboardStatsResponse(
        long totalApplications,
        long applicationsThisMonth,
        long interviews,
        long offers,
        double acceptanceRatePercent,
        double responseRatePercent
) {
}

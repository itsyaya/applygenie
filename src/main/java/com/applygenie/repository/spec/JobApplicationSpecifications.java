package com.applygenie.repository.spec;

import com.applygenie.entity.ApplicationStatus;
import com.applygenie.entity.JobApplication;
import com.applygenie.entity.Priority;
import org.springframework.data.jpa.domain.Specification;

public final class JobApplicationSpecifications {

    private JobApplicationSpecifications() {
    }

    public static Specification<JobApplication> belongsToUser(Long userId) {
        return (root, query, cb) -> cb.equal(root.get("user").get("id"), userId);
    }

    public static Specification<JobApplication> isArchived(boolean archived) {
        return (root, query, cb) -> cb.equal(root.get("archived"), archived);
    }

    public static Specification<JobApplication> hasStatus(ApplicationStatus status) {
        return (root, query, cb) -> status == null ? cb.conjunction() : cb.equal(root.get("status"), status);
    }

    public static Specification<JobApplication> hasPriority(Priority priority) {
        return (root, query, cb) -> priority == null ? cb.conjunction() : cb.equal(root.get("priority"), priority);
    }

    public static Specification<JobApplication> companyContains(String company) {
        return (root, query, cb) -> (company == null || company.isBlank())
                ? cb.conjunction()
                : cb.like(cb.lower(root.get("company")), "%" + company.toLowerCase() + "%");
    }

    public static Specification<JobApplication> matchesKeyword(String keyword) {
        return (root, query, cb) -> {
            if (keyword == null || keyword.isBlank()) {
                return cb.conjunction();
            }
            String like = "%" + keyword.toLowerCase() + "%";
            return cb.or(
                    cb.like(cb.lower(root.get("title")), like),
                    cb.like(cb.lower(root.get("company")), like),
                    cb.like(cb.lower(root.get("description")), like)
            );
        };
    }

    public static Specification<JobApplication> hasTag(String tagName) {
        return (root, query, cb) -> {
            if (tagName == null || tagName.isBlank()) {
                return cb.conjunction();
            }
            query.distinct(true);
            return cb.equal(cb.lower(root.join("tags").get("name")), tagName.toLowerCase());
        };
    }
}

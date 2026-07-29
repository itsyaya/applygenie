package com.applygenie.service.impl;

import com.applygenie.dto.request.JobApplicationFilter;
import com.applygenie.dto.request.JobApplicationRequest;
import com.applygenie.entity.ApplicationStatus;
import com.applygenie.entity.JobApplication;
import com.applygenie.entity.Resume;
import com.applygenie.entity.Tag;
import com.applygenie.entity.User;
import com.applygenie.exception.custom.ResourceNotFoundException;
import com.applygenie.exception.custom.UnauthorizedAccessException;
import com.applygenie.repository.JobApplicationRepository;
import com.applygenie.repository.ResumeRepository;
import com.applygenie.repository.TagRepository;
import com.applygenie.repository.spec.JobApplicationSpecifications;
import com.applygenie.security.CurrentUserService;
import com.applygenie.service.AIService;
import com.applygenie.service.JobApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class JobApplicationServiceImpl implements JobApplicationService {

    private final JobApplicationRepository jobApplicationRepository;
    private final ResumeRepository resumeRepository;
    private final TagRepository tagRepository;
    private final CurrentUserService currentUserService;
    private final AIService aiService;

    @Override
    @Transactional
    public JobApplication create(JobApplicationRequest request) {
        User currentUser = currentUserService.getCurrentUser();

        JobApplication application = JobApplication.builder()
                .user(currentUser)
                .title(request.title())
                .description(request.description())
                .company(request.company())
                .location(request.location())
                .salary(request.salary())
                .recruiter(request.recruiter())
                .status(request.status() != null ? request.status() : ApplicationStatus.WISHLIST)
                .priority(request.priority() != null ? request.priority() : com.applygenie.entity.Priority.MEDIUM)
                .resume(resolveOwnedResume(request.resumeId(), currentUser))
                .applicationDate(request.applicationDate())
                .interviewDate(request.interviewDate())
                .followUpDate(request.followUpDate())
                .offerDate(request.offerDate())
                .rejectionDate(request.rejectionDate())
                .build();

        return jobApplicationRepository.save(application);
    }

    @Override
    @Transactional
    public JobApplication update(Long id, JobApplicationRequest request) {
        JobApplication application = getOwnedApplication(id);

        application.setTitle(request.title());
        application.setDescription(request.description());
        application.setCompany(request.company());
        application.setLocation(request.location());
        application.setSalary(request.salary());
        application.setRecruiter(request.recruiter());
        if (request.status() != null) {
            application.setStatus(request.status());
        }
        if (request.priority() != null) {
            application.setPriority(request.priority());
        }
        application.setResume(resolveOwnedResume(request.resumeId(), application.getUser()));
        application.setApplicationDate(request.applicationDate());
        application.setInterviewDate(request.interviewDate());
        application.setFollowUpDate(request.followUpDate());
        application.setOfferDate(request.offerDate());
        application.setRejectionDate(request.rejectionDate());

        return jobApplicationRepository.save(application);
    }

    @Override
    @Transactional
    public JobApplication updateStatus(Long id, ApplicationStatus status) {
        JobApplication application = getOwnedApplication(id);
        application.setStatus(status);
        return jobApplicationRepository.save(application);
    }

    @Override
    @Transactional
    public JobApplication archive(Long id) {
        JobApplication application = getOwnedApplication(id);
        application.setArchived(true);
        return jobApplicationRepository.save(application);
    }

    @Override
    @Transactional
    public JobApplication restore(Long id) {
        JobApplication application = getOwnedApplication(id);
        application.setArchived(false);
        return jobApplicationRepository.save(application);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        JobApplication application = getOwnedApplication(id);
        jobApplicationRepository.delete(application);
    }

    @Override
    @Transactional(readOnly = true)
    public JobApplication getOwnedApplication(Long id) {
        JobApplication application = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job application not found"));
        User currentUser = currentUserService.getCurrentUser();
        if (!application.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedAccessException("Unauthorized to access this job application");
        }
        return application;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<JobApplication> search(JobApplicationFilter filter, Pageable pageable) {
        Long userId = currentUserService.getCurrentUser().getId();

        Specification<JobApplication> spec = Specification
                .where(JobApplicationSpecifications.belongsToUser(userId))
                .and(JobApplicationSpecifications.isArchived(filter.archived()))
                .and(JobApplicationSpecifications.hasStatus(filter.status()))
                .and(JobApplicationSpecifications.hasPriority(filter.priority()))
                .and(JobApplicationSpecifications.companyContains(filter.company()))
                .and(JobApplicationSpecifications.matchesKeyword(filter.keyword()))
                .and(JobApplicationSpecifications.hasTag(filter.tag()));

        return jobApplicationRepository.findAll(spec, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public String matchResumeWithJob(Long resumeId, Long jobId) {
        User currentUser = currentUserService.getCurrentUser();

        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new ResourceNotFoundException("Resume not found"));
        JobApplication application = jobApplicationRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job application not found"));

        if (!resume.getUser().getId().equals(currentUser.getId()) ||
                !application.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedAccessException("Unauthorized to access these resources");
        }

        return aiService.analyzeResume(resume.getParsedText(), application.getDescription());
    }

    @Override
    @Transactional
    public JobApplication addTag(Long jobApplicationId, Long tagId) {
        JobApplication application = getOwnedApplication(jobApplicationId);
        Tag tag = getOwnedTag(tagId, application.getUser());
        application.getTags().add(tag);
        return jobApplicationRepository.save(application);
    }

    @Override
    @Transactional
    public JobApplication removeTag(Long jobApplicationId, Long tagId) {
        JobApplication application = getOwnedApplication(jobApplicationId);
        Tag tag = getOwnedTag(tagId, application.getUser());
        application.getTags().remove(tag);
        return jobApplicationRepository.save(application);
    }

    private Tag getOwnedTag(Long tagId, User owner) {
        Tag tag = tagRepository.findById(tagId)
                .orElseThrow(() -> new ResourceNotFoundException("Tag not found"));
        if (!tag.getUser().getId().equals(owner.getId())) {
            throw new UnauthorizedAccessException("Unauthorized to access this tag");
        }
        return tag;
    }

    private Resume resolveOwnedResume(Long resumeId, User owner) {
        if (resumeId == null) {
            return null;
        }
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new ResourceNotFoundException("Resume not found"));
        if (!resume.getUser().getId().equals(owner.getId())) {
            throw new UnauthorizedAccessException("Unauthorized to access this resume");
        }
        return resume;
    }
}

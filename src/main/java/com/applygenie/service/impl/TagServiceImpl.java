package com.applygenie.service.impl;

import com.applygenie.dto.request.TagRequest;
import com.applygenie.entity.Tag;
import com.applygenie.entity.User;
import com.applygenie.exception.custom.ResourceAlreadyExistsException;
import com.applygenie.exception.custom.ResourceNotFoundException;
import com.applygenie.exception.custom.UnauthorizedAccessException;
import com.applygenie.repository.TagRepository;
import com.applygenie.security.CurrentUserService;
import com.applygenie.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;
    private final CurrentUserService currentUserService;

    @Override
    @Transactional
    public Tag create(TagRequest request) {
        User currentUser = currentUserService.getCurrentUser();
        if (tagRepository.existsByUserIdAndNameIgnoreCase(currentUser.getId(), request.name())) {
            throw new ResourceAlreadyExistsException("A tag with this name already exists");
        }
        Tag tag = Tag.builder()
                .user(currentUser)
                .name(request.name())
                .color(request.color())
                .build();
        return tagRepository.save(tag);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Tag> getUserTags() {
        return tagRepository.findByUserIdOrderByNameAsc(currentUserService.getCurrentUser().getId());
    }

    @Override
    @Transactional
    public void delete(Long tagId) {
        Tag tag = tagRepository.findById(tagId)
                .orElseThrow(() -> new ResourceNotFoundException("Tag not found"));
        Long currentUserId = currentUserService.getCurrentUser().getId();
        if (!tag.getUser().getId().equals(currentUserId)) {
            throw new UnauthorizedAccessException("Unauthorized to access this tag");
        }
        tagRepository.delete(tag);
    }
}

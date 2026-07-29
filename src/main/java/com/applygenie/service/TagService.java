package com.applygenie.service;

import com.applygenie.dto.request.TagRequest;
import com.applygenie.entity.Tag;

import java.util.List;

public interface TagService {
    Tag create(TagRequest request);

    List<Tag> getUserTags();

    void delete(Long tagId);
}

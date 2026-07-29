package com.applygenie.mapper;

import com.applygenie.dto.response.TagResponse;
import com.applygenie.entity.Tag;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TagMapper {
    TagResponse toResponse(Tag entity);
}

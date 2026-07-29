package com.applygenie.mapper;

import com.applygenie.dto.response.GeneratedContentResponse;
import com.applygenie.entity.GeneratedContent;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface GeneratedContentMapper {

    @Mapping(target = "resumeId", source = "resume.id")
    @Mapping(target = "jobId", source = "jobApplication.id")
    GeneratedContentResponse toResponse(GeneratedContent entity);
}

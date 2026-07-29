package com.applygenie.mapper;

import com.applygenie.dto.response.JobApplicationResponse;
import com.applygenie.entity.JobApplication;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = TagMapper.class)
public interface JobApplicationMapper {

    @Mapping(target = "resumeId", source = "resume.id")
    JobApplicationResponse toResponse(JobApplication entity);
}

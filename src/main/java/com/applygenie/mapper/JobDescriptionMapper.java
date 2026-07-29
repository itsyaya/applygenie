package com.applygenie.mapper;

import com.applygenie.dto.response.JobDescriptionResponse;
import com.applygenie.entity.JobDescription;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface JobDescriptionMapper {
    JobDescriptionResponse toResponse(JobDescription entity);
}

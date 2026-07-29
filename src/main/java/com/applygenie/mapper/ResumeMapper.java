package com.applygenie.mapper;

import com.applygenie.dto.response.ResumeResponse;
import com.applygenie.entity.Resume;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ResumeMapper {
    ResumeResponse toResponse(Resume entity);
}

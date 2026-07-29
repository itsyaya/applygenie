package com.applygenie.mapper;

import com.applygenie.dto.response.UserProfileResponse;
import com.applygenie.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "preferredResumeId", source = "preferredResume.id")
    UserProfileResponse toProfileResponse(User entity);
}

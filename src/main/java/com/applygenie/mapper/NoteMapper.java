package com.applygenie.mapper;

import com.applygenie.dto.response.NoteResponse;
import com.applygenie.entity.Note;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface NoteMapper {
    NoteResponse toResponse(Note entity);
}

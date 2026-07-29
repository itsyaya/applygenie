package com.applygenie.service;

import com.applygenie.dto.request.NoteRequest;
import com.applygenie.entity.Note;

import java.util.List;

public interface NoteService {
    Note create(Long jobApplicationId, NoteRequest request);

    List<Note> getForApplication(Long jobApplicationId);

    Note update(Long noteId, NoteRequest request);

    void delete(Long noteId);
}

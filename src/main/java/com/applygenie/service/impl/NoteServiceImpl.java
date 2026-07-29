package com.applygenie.service.impl;

import com.applygenie.dto.request.NoteRequest;
import com.applygenie.entity.JobApplication;
import com.applygenie.entity.Note;
import com.applygenie.exception.custom.ResourceNotFoundException;
import com.applygenie.exception.custom.UnauthorizedAccessException;
import com.applygenie.repository.NoteRepository;
import com.applygenie.security.CurrentUserService;
import com.applygenie.service.JobApplicationService;
import com.applygenie.service.NoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoteServiceImpl implements NoteService {

    private final NoteRepository noteRepository;
    private final JobApplicationService jobApplicationService;
    private final CurrentUserService currentUserService;

    @Override
    @Transactional
    public Note create(Long jobApplicationId, NoteRequest request) {
        JobApplication application = jobApplicationService.getOwnedApplication(jobApplicationId);
        Note note = Note.builder()
                .jobApplication(application)
                .content(request.content())
                .build();
        return noteRepository.save(note);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Note> getForApplication(Long jobApplicationId) {
        jobApplicationService.getOwnedApplication(jobApplicationId);
        return noteRepository.findByJobApplicationIdOrderByCreatedAtDesc(jobApplicationId);
    }

    @Override
    @Transactional
    public Note update(Long noteId, NoteRequest request) {
        Note note = getOwnedNote(noteId);
        note.setContent(request.content());
        return noteRepository.save(note);
    }

    @Override
    @Transactional
    public void delete(Long noteId) {
        Note note = getOwnedNote(noteId);
        noteRepository.delete(note);
    }

    private Note getOwnedNote(Long noteId) {
        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new ResourceNotFoundException("Note not found"));
        Long currentUserId = currentUserService.getCurrentUser().getId();
        if (!note.getJobApplication().getUser().getId().equals(currentUserId)) {
            throw new UnauthorizedAccessException("Unauthorized to access this note");
        }
        return note;
    }
}

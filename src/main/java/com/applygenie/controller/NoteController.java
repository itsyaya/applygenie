package com.applygenie.controller;

import com.applygenie.dto.request.NoteRequest;
import com.applygenie.dto.response.ApiResponse;
import com.applygenie.dto.response.NoteResponse;
import com.applygenie.entity.Note;
import com.applygenie.mapper.NoteMapper;
import com.applygenie.service.NoteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class NoteController {

    private final NoteService noteService;
    private final NoteMapper noteMapper;

    @PostMapping("/job/{jobId}/notes")
    public ResponseEntity<ApiResponse<NoteResponse>> create(@PathVariable Long jobId, @Valid @RequestBody NoteRequest request) {
        Note note = noteService.create(jobId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Note added", noteMapper.toResponse(note)));
    }

    @GetMapping("/job/{jobId}/notes")
    public ResponseEntity<ApiResponse<List<NoteResponse>>> getForApplication(@PathVariable Long jobId) {
        List<NoteResponse> notes = noteService.getForApplication(jobId).stream().map(noteMapper::toResponse).toList();
        return ResponseEntity.ok(ApiResponse.success("Notes fetched", notes));
    }

    @PutMapping("/notes/{noteId}")
    public ResponseEntity<ApiResponse<NoteResponse>> update(@PathVariable Long noteId, @Valid @RequestBody NoteRequest request) {
        Note note = noteService.update(noteId, request);
        return ResponseEntity.ok(ApiResponse.success("Note updated", noteMapper.toResponse(note)));
    }

    @DeleteMapping("/notes/{noteId}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long noteId) {
        noteService.delete(noteId);
        return ResponseEntity.ok(ApiResponse.success("Note deleted"));
    }
}

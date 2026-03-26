package com.applygenie.controller;

import com.applygenie.dto.request.GenerationRequest;
import com.applygenie.dto.response.ApiResponse;
import com.applygenie.entity.GeneratedContent;
import com.applygenie.service.AiGenerationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/generate")
@RequiredArgsConstructor
public class GenerationController {

    private final AiGenerationService aiGenerationService;

    @PostMapping
    public ResponseEntity<ApiResponse<GeneratedContent>> generateContent(@Valid @RequestBody GenerationRequest request) {
        GeneratedContent content = aiGenerationService.generateContent(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(true, "Content generated successfully", content));
    }

    @GetMapping("/user")
    public ResponseEntity<ApiResponse<List<GeneratedContent>>> getUserGeneratedContents() {
        List<GeneratedContent> contents = aiGenerationService.getUserGeneratedContents();
        return ResponseEntity.ok(new ApiResponse<>(true, "User generated contents fetched", contents));
    }
}

package com.applygenie.controller;

import com.applygenie.dto.request.GenerationRequest;
import com.applygenie.dto.response.ApiResponse;
import com.applygenie.dto.response.GeneratedContentResponse;
import com.applygenie.entity.GeneratedContent;
import com.applygenie.mapper.GeneratedContentMapper;
import com.applygenie.service.AiGenerationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/generate")
@RequiredArgsConstructor
public class GenerationController {

    private final AiGenerationService aiGenerationService;
    private final GeneratedContentMapper generatedContentMapper;

    @PostMapping
    public ResponseEntity<ApiResponse<GeneratedContentResponse>> generateContent(
            @Valid @RequestBody GenerationRequest request) {
        GeneratedContent content = aiGenerationService.generateContent(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Content generated successfully", generatedContentMapper.toResponse(content)));
    }

    @GetMapping("/user")
    public ResponseEntity<ApiResponse<Page<GeneratedContentResponse>>> getUserGeneratedContents(
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<GeneratedContentResponse> contents = aiGenerationService.getUserGeneratedContents(pageable)
                .map(generatedContentMapper::toResponse);
        return ResponseEntity.ok(ApiResponse.success("User generated contents fetched", contents));
    }
}

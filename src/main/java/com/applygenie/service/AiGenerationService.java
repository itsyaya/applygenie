package com.applygenie.service;

import com.applygenie.dto.request.GenerationRequest;
import com.applygenie.entity.GeneratedContent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AiGenerationService {
    GeneratedContent generateContent(GenerationRequest request);
    Page<GeneratedContent> getUserGeneratedContents(Pageable pageable);
}

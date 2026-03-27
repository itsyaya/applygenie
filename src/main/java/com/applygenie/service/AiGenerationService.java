package com.applygenie.service;

import com.applygenie.dto.request.GenerationRequest;
import com.applygenie.entity.GeneratedContent;

import java.util.List;

public interface AiGenerationService {
    GeneratedContent generateContent(GenerationRequest request);
    List<GeneratedContent> getUserGeneratedContents();
}

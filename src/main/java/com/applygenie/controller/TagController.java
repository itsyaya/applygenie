package com.applygenie.controller;

import com.applygenie.dto.request.TagRequest;
import com.applygenie.dto.response.ApiResponse;
import com.applygenie.dto.response.TagResponse;
import com.applygenie.entity.Tag;
import com.applygenie.mapper.TagMapper;
import com.applygenie.service.TagService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tags")
@RequiredArgsConstructor
public class TagController {

    private final TagService tagService;
    private final TagMapper tagMapper;

    @PostMapping
    public ResponseEntity<ApiResponse<TagResponse>> create(@Valid @RequestBody TagRequest request) {
        Tag tag = tagService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Tag created", tagMapper.toResponse(tag)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<TagResponse>>> getUserTags() {
        List<TagResponse> tags = tagService.getUserTags().stream().map(tagMapper::toResponse).toList();
        return ResponseEntity.ok(ApiResponse.success("Tags fetched", tags));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        tagService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Tag deleted"));
    }
}

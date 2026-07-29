package com.applygenie.service.impl;

import com.applygenie.service.StorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

// Dev-only stand-in for S3StorageServiceImpl so local dev doesn't need AWS credentials.
@Service
@Profile("dev")
@Slf4j
public class LocalStorageServiceImpl implements StorageService {

    private final Path storageRoot = Paths.get("local-storage", "resumes");

    public LocalStorageServiceImpl() throws IOException {
        Files.createDirectories(storageRoot);
    }

    @Override
    public String uploadFile(MultipartFile file) throws IOException {
        String fileKey = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Files.copy(file.getInputStream(), storageRoot.resolve(fileKey));
        return fileKey;
    }

    @Override
    public byte[] downloadFile(String fileKey) throws IOException {
        return Files.readAllBytes(storageRoot.resolve(fileKey));
    }

    @Override
    public void deleteFile(String fileKey) {
        try {
            Files.deleteIfExists(storageRoot.resolve(fileKey));
        } catch (IOException e) {
            log.warn("Failed to delete local file {}: {}", fileKey, e.getMessage());
        }
    }
}

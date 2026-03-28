package com.applygenie.service.impl;

import com.applygenie.service.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;
import io.github.resilience4j.retry.annotation.Retry;

@Service
@RequiredArgsConstructor
public class S3StorageServiceImpl implements StorageService {

    private final S3Client s3Client;

    @Value("${aws.s3.bucket}")
    private String bucketName;

    @Override
    @io.github.resilience4j.retry.annotation.Retry(name = "s3")
    public String uploadFile(MultipartFile file) throws IOException {
        String fileKey = UUID.randomUUID() + "_" + file.getOriginalFilename();

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(fileKey)
                .contentType(file.getContentType())
                .build();

        s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

        return fileKey;
    }

    @Override
    public void deleteFile(String fileKey) {
        s3Client.deleteObject(builder -> builder.bucket(bucketName).key(fileKey));
    }
}

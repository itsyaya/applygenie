package com.applygenie.service;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

public interface StorageService {
    String uploadFile(MultipartFile file) throws IOException;
    byte[] downloadFile(String fileKey) throws IOException;
    void deleteFile(String fileKey);
}

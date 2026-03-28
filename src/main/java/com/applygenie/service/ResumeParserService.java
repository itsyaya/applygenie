package com.applygenie.service;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

public interface ResumeParserService {
    String parseResume(MultipartFile file) throws IOException;
}

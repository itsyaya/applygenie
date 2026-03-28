package com.applygenie.service.impl;

import com.applygenie.service.ResumeParserService;
import org.apache.tika.Tika;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class TikaResumeParserServiceImpl implements ResumeParserService {

    private final Tika tika = new Tika();

    @Override
    public String parseResume(MultipartFile file) throws IOException {
        try {
            return tika.parseToString(file.getInputStream());
        } catch (Exception e) {
            throw new IOException("Failed to parse resume: " + e.getMessage());
        }
    }
}

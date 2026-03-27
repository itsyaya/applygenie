package com.applygenie.service.impl;

import com.applygenie.entity.Resume;
import com.applygenie.entity.User;
import com.applygenie.repository.ResumeRepository;
import com.applygenie.repository.UserRepository;
import com.applygenie.security.CustomUserDetails;
import com.applygenie.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ResumeServiceImpl implements ResumeService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;

    private final String UPLOAD_DIR = "uploads/resumes/";

    @Override
    public Resume uploadResume(MultipartFile file) {
        User currentUser = getCurrentUser();

        try {
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename != null && originalFilename.contains(".") 
                    ? originalFilename.substring(originalFilename.lastIndexOf(".")) 
                    : ".pdf";
            String newFilename = UUID.randomUUID() + extension;
            Path filePath = Paths.get(UPLOAD_DIR + newFilename);

            Files.write(filePath, file.getBytes());

            // Mock PDF Parsing
            String mockParsedText = "Parsed content for: " + originalFilename;

            Resume resume = Resume.builder()
                    .user(currentUser)
                    .fileName(originalFilename)
                    .filePath(filePath.toString())
                    .parsedText(mockParsedText)
                    .build();

            return resumeRepository.save(resume);

        } catch (IOException e) {
            throw new RuntimeException("Failed to store resume file", e);
        }
    }

    @Override
    public List<Resume> getUserResumes() {
        return resumeRepository.findByUserId(getCurrentUser().getId());
    }

    private User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = ((CustomUserDetails) principal).getUsername();
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}

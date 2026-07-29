package com.applygenie.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(unique = true)
    private String stripeCustomerId;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private SubscriptionTier subscriptionTier = SubscriptionTier.FREE;

    @Builder.Default
    private boolean subscriptionActive = false;

    @Column(nullable = false)
    @Builder.Default
    private boolean emailVerified = false;

    @Column(columnDefinition = "TEXT")
    private String bio;

    private String location;

    private String linkedinUrl;

    private String githubUrl;

    private String portfolioUrl;

    private String profileImageKey;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "preferred_resume_id")
    @org.hibernate.annotations.OnDelete(action = org.hibernate.annotations.OnDeleteAction.SET_NULL)
    private Resume preferredResume;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}

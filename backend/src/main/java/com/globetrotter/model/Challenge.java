package com.globetrotter.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "challenges")
public class Challenge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "challenger_id")
    private User challenger;
    
    @ManyToOne
    @JoinColumn(name = "opponent_id")
    private User opponent;
    
    @Column(name = "invite_code", unique = true, nullable = false)
    private String inviteCode;
    
    @Column(name = "challenger_score", nullable = false)
    private int challengerScore;
    
    @Column(name = "challenger_correct_answers", nullable = false)
    private int challengerCorrectAnswers;
    
    @Column(name = "challenger_incorrect_answers", nullable = false)
    private int challengerIncorrectAnswers;
    
    @Column(name = "opponent_score", nullable = false)
    private int opponentScore;
    
    @Column(name = "opponent_correct_answers", nullable = false)
    private int opponentCorrectAnswers;
    
    @Column(name = "opponent_incorrect_answers", nullable = false)
    private int opponentIncorrectAnswers;
    
    @Column(name = "is_active", nullable = false)
    private boolean active = true;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "completed")
    private boolean completed;
    
    @Column(name = "expires_at")
    private LocalDateTime expiresAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
} 
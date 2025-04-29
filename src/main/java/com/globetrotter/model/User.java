package com.globetrotter.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    private String email;
    private int totalScore;
    private int gamesPlayed;
    private int correctAnswers;
    private int incorrectAnswers;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public void updateScore(boolean correct) {
        this.gamesPlayed++;
        if (correct) {
            this.correctAnswers++;
            this.totalScore += 10;
        } else {
            this.incorrectAnswers++;
        }
    }
} 
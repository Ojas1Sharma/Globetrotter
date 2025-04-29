package com.globetrotter.model;

import lombok.Data;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String username;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(name = "invite_code", unique = true)
    private String inviteCode;
    
    @Column(name = "total_score")
    private int totalScore;
    
    @Column(name = "games_played")
    private int gamesPlayed;
    
    @Column(name = "correct_answers")
    private int correctAnswers;
    
    @Column(name = "incorrect_answers")
    private int incorrectAnswers;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;

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
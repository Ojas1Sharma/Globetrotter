package com.globetrotter.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class GameSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "destination_id", nullable = false)
    private Destination currentDestination;
    
    @ElementCollection
    @CollectionTable(name = "game_options", joinColumns = @JoinColumn(name = "game_session_id"))
    @Column(name = "option")
    private List<String> options;
    
    private int score;
    private boolean completed;
    private LocalDateTime startedAt;
    private LocalDateTime endedAt;
    private String inviteCode;
    
    @PrePersist
    protected void onCreate() {
        startedAt = LocalDateTime.now();
        completed = false;
        score = 0;
    }
} 
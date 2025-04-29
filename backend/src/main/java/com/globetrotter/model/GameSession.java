package com.globetrotter.model;

import lombok.Data;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "game_sessions")
public class GameSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "current_destination_id", nullable = false)
    private Destination currentDestination;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ElementCollection
    @CollectionTable(name = "game_session_options", joinColumns = @JoinColumn(name = "game_session_id"))
    @Column(name = "option_text")
    private List<String> options;
    
    @Column(name = "invite_code", unique = true)
    private String inviteCode;
    
    @Column(nullable = false)
    private boolean completed = false;
    
    @Column(nullable = false)
    private int score = 0;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Column(name = "started_at")
    private LocalDateTime startedAt;
    
    @Column(name = "ended_at")
    private LocalDateTime endedAt;
    
    @Column(name = "submitted_destination_id")
    private Long submittedDestinationId;
} 
package com.globetrotter.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
public class Challenge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "challenger_id", nullable = false)
    private User challenger;
    
    @ManyToOne
    @JoinColumn(name = "destination_id", nullable = false)
    private Destination destination;
    
    @Column(unique = true, nullable = false)
    private String inviteCode;
    
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;
    private boolean completed;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        expiresAt = createdAt.plusDays(7);
        inviteCode = UUID.randomUUID().toString();
        completed = false;
    }
} 
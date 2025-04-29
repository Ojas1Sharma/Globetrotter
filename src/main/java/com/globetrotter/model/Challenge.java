package com.globetrotter.model;

import lombok.Data;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "challenges")
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
    
    @Column(name = "invite_code", unique = true)
    private String inviteCode;
    
    @Column(name = "completed")
    private boolean completed;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "expires_at")
    private LocalDateTime expiresAt;
} 
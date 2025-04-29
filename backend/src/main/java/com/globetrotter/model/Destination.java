package com.globetrotter.model;

import lombok.Data;
import jakarta.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "destinations")
public class Destination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String country;
    
    @Column(nullable = false)
    private String continent;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @ElementCollection
    @CollectionTable(name = "destination_clues", joinColumns = @JoinColumn(name = "destination_id"))
    @Column(name = "clue")
    private List<String> clues;
    
    @ElementCollection
    @CollectionTable(name = "destination_fun_facts", joinColumns = @JoinColumn(name = "destination_id"))
    @Column(name = "fun_fact")
    private List<String> funFacts;
    
    @Column(name = "image_url")
    private String imageUrl;
    
    private Double latitude;
    private Double longitude;
    
    @Column(nullable = false)
    private String difficulty;
    
    @Column(nullable = false)
    private boolean active;
} 
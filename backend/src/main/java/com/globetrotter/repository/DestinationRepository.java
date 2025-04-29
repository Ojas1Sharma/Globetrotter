package com.globetrotter.repository;

import com.globetrotter.model.Destination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DestinationRepository extends JpaRepository<Destination, Long> {
    @Query(value = "SELECT * FROM destinations ORDER BY RAND() LIMIT 1", nativeQuery = true)
    Destination findRandomDestination();
    
    @Query(value = "SELECT * FROM destinations WHERE id != ?1 ORDER BY RAND() LIMIT ?2", nativeQuery = true)
    List<Destination> findRandomDestinations(Long excludeId, int limit);
} 
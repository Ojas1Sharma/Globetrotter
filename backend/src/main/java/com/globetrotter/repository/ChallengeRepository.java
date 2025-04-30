package com.globetrotter.repository;

import com.globetrotter.model.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
    Optional<Challenge> findByInviteCode(String inviteCode);
    boolean existsByInviteCode(String inviteCode);
} 
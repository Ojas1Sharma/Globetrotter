package com.globetrotter.repository;

import com.globetrotter.model.Challenge;
import com.globetrotter.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
    Optional<Challenge> findByInviteCode(String inviteCode);
    List<Challenge> findByChallengerAndCompletedFalse(User challenger);
} 
package com.globetrotter.repository;

import com.globetrotter.model.GameSession;
import com.globetrotter.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface GameSessionRepository extends JpaRepository<GameSession, Long> {
    Optional<GameSession> findById(Long id);
    List<GameSession> findByUserAndCompletedFalse(User user);
    List<GameSession> findByUserOrderByStartedAtDesc(User user);
    Optional<GameSession> findByInviteCode(String inviteCode);
    List<GameSession> findByUserAndCompletedTrue(User user);
} 
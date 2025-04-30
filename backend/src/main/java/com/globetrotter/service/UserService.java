package com.globetrotter.service;

import com.globetrotter.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import java.util.List;

public interface UserService extends UserDetailsService {
    User registerUser(String username, String email, String password);
    User getUserByUsername(String username);
    User getUserByInviteCode(String inviteCode);
    boolean isUsernameAvailable(String username);
    User updateUserScore(String username, int score);
    UserDetails loadUserByUsername(String username);
    List<User> getLeaderboard();
} 
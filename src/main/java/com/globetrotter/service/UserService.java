package com.globetrotter.service;

import com.globetrotter.model.User;

public interface UserService {
    User registerUser(String username);
    User getUserByUsername(String username);
    User getUserByInviteCode(String inviteCode);
    boolean isUsernameAvailable(String username);
} 
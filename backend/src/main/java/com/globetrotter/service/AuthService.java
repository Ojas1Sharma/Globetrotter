package com.globetrotter.service;

import com.globetrotter.model.User;

public interface AuthService {
    String login(String username);
    User getUserByUsername(String username);
} 
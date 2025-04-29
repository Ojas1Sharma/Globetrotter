package com.globetrotter.service.impl;

import com.globetrotter.model.User;
import com.globetrotter.repository.UserRepository;
import com.globetrotter.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public User registerUser(String username) {
        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("Username already exists");
        }

        User user = new User();
        user.setUsername(username);
        return userRepository.save(user);
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    @Override
    public User getUserByInviteCode(String inviteCode) {
        return userRepository.findByInviteCode(inviteCode)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    @Override
    public boolean isUsernameAvailable(String username) {
        return !userRepository.existsByUsername(username);
    }
} 
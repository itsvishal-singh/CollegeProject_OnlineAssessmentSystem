package com.example.online_assessment_backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.online_assessment_backend.dto.LoginRequest;
import com.example.online_assessment_backend.dto.RegisterRequest;
import com.example.online_assessment_backend.entity.UserEntity;
import com.example.online_assessment_backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private boolean isValidName(
            String fullName) {
        if (fullName == null) {
            return false;
        }
        fullName = fullName.trim();
        if (fullName.equalsIgnoreCase(
                "null")) {
            return false;
        }
        return fullName.matches(
                "^(?=.{3,50}$)[A-Za-z]+(?: [A-Za-z]+)*$");
    }

    // REGISTER
    public String register(RegisterRequest request) {

        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return "Username already exists";
        }
        
        if (!isValidName(
                request.getFullName())) {
            return "Please enter a valid full name";
        }

        UserEntity user = UserEntity.builder()
                .fullName(request.getFullName())

                .username(request.getUsername())
                .mobile(request.getMobile())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("ROLE_" + request.getRole())
                .enabled(true)
                .build();

        userRepository.save(user);

        return "User registered successfully";
    }

    // LOGIN
    public String login(LoginRequest request) {

        UserEntity user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid username"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException("Invalid password");
        }

        return "Login Successful";
    }
}

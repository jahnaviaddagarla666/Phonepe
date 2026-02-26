package com.phonepe.service;

import com.phonepe.dto.LoginRequest;
import com.phonepe.dto.UserRegistrationRequest;
import com.phonepe.entity.User;
import com.phonepe.entity.Wallet;
import com.phonepe.repository.UserRepository;
import com.phonepe.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final WalletRepository walletRepository;
     private final BCryptPasswordEncoder passwordEncoder;
   
@Transactional
public User registerUser(UserRegistrationRequest request) {

    if (userRepository.existsByPhoneNumber(request.getPhoneNumber())) {
        throw new RuntimeException("Phone number already registered");
    }

    if (userRepository.existsByUpiId(request.getUpiId())) {
        throw new RuntimeException("UPI ID already exists");
    }

    User user = new User();
    user.setName(request.getName());
    user.setPhoneNumber(request.getPhoneNumber());
    user.setUpiId(request.getUpiId());
    user.setPin(passwordEncoder.encode(request.getPin()));

    Wallet wallet = new Wallet();
    wallet.setUser(user);
    wallet.setBalance(BigDecimal.ZERO);

    user.setWallet(wallet);   // 🔥 VERY IMPORTANT

    return userRepository.save(user); // cascade will save wallet
}

public User login(LoginRequest request) {
    User user = userRepository.findByPhoneNumber(request.getPhoneNumber())
            .orElseThrow(() -> new RuntimeException("Invalid phone number or PIN"));

    // This line was wrong – equals() cannot compare plain vs hashed
    // Change to:
    if (!passwordEncoder.matches(request.getPin(), user.getPin())) {
        throw new RuntimeException("Invalid phone number or PIN");
    }

    return user;
}

    public User getUserProfile(String upiId) {
        return userRepository.findByUpiId(upiId.trim())
                .orElseThrow(() -> new RuntimeException("User not found with UPI ID: " + upiId));
    }
}
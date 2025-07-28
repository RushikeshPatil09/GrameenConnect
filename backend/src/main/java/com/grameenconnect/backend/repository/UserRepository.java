package com.grameenconnect.backend.repository;

import com.grameenconnect.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // 👇 This custom method helps us find user by email
    Optional<User> findByEmail(String email);
}

package com.shoponline.backend_auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shoponline.backend_auth.model.User;

// Extindem JpaRepository, specificând Entitatea (User) și tipul ID-ului (Long)
public interface UserRepository extends JpaRepository<User, Long> {

    // Spring Data JPA va înțelege automat această metodă
    // și va genera o interogare SQL: "SELECT * FROM users WHERE username = ?"
    Optional<User> findByUsername(String username);
}
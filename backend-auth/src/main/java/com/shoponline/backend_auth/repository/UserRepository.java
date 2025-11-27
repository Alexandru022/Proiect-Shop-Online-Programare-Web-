package com.shoponline.backend_auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shoponline.backend_auth.model.User;

public interface UserRepository extends JpaRepository<User, Long> {


    Optional<User> findByUsername(String username);
}
package com.shoponline.backend_auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shoponline.backend_auth.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
}
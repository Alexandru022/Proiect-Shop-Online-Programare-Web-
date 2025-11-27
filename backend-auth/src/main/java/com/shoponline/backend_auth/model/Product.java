package com.shoponline.backend_auth.model; // Verifică numele pachetului!

import jakarta.persistence.Entity; // <-- IMPORTANT
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity // <-- ACEASTA ESTE ESENȚIALĂ! Fără ea, primești eroarea "Not a managed type"
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private Double price;
    private String imageUrl;
}
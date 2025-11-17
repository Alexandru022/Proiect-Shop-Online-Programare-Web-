package com.shoponline.backend_auth.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data; // Importă Lombok

@Data // Spune-i lui Lombok să genereze Getters, Setters, toString, etc.
@Entity // Spune-i lui JPA că aceasta este o entitate (tabelă)
@Table(name = "users") // Numele tabelei în baza de date
public class User {

    @Id // Marchează acest câmp ca ID-ul primar
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Generează automat ID-ul
    private Long id;

    private String username;
    private String password; // Va fi stocată parola criptată
    private String role; // Ex: "ROLE_ADMIN" sau "ROLE_CLIENT"
}
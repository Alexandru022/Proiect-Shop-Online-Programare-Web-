package com.shoponline.backend_auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor // Generează un constructor cu toate argumentele (token, role, username)
public class AuthResponse {
    private String token;
    private String role;
    private String username;
}
package com.shoponline.backend_auth.dto;

import lombok.Data;

// @Data (de la Lombok) va genera automat 
// constructorul, gettere, settere, etc.
@Data
public class AuthRequest {
    // Numele câmpurilor trebuie să se potrivească 
    // 100% cu cheile din JSON-ul pe care îl va trimite Angular
    private String username;
    private String password;
}
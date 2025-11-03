package com.shoponline.backend_auth.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController // Marchează clasa ca un controller REST
@RequestMapping("/api/auth") // Definește prefixul URL pentru toate metodele din clasă
public class AuthController {

    /**
     * Endpoint-ul de login. 
     * Spring Security interceptează cererea, o autentifică și populează obiectul 'authentication'.
     * Dacă autentificarea eșuează, Spring Security returnează automat 401 Unauthorized.
     * Dacă reușește, codul nostru rulează.
     */
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(Authentication authentication) {
        
        // Extragem rolul utilizatorului autentificat.
        // Rolurile în Spring Security sunt prefixate cu "ROLE_" (ex: "ROLE_ADMIN").
        String role = authentication.getAuthorities().stream()
            .filter(a -> a.getAuthority().startsWith("ROLE_"))
            .findFirst()
            // Extragem doar numele rolului (e.g., eliminăm "ROLE_" pentru a obține "ADMIN")
            .map(a -> a.getAuthority().substring(5)) 
            .orElse("UNKNOWN");

        // Construim un răspuns JSON pe care Angular îl poate citi
        Map<String, String> response = new HashMap<>();
        response.put("message", "Autentificare reușită!");
        response.put("username", authentication.getName());
        response.put("role", role); // Returnăm rolul (ADMIN sau CLIENT)

        // Returnăm răspunsul cu statusul HTTP 200 OK
        return ResponseEntity.ok(response);
    }
    
    // Un exemplu de endpoint protejat pentru Admin, doar pentru testare:
    @GetMapping("/admin/status")
    public String adminStatus() {
        return "Acces permis. Ești logat ca Administrator.";
    }
}
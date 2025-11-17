package com.shoponline.backend_auth.controller;

// Importăm noile DTO-uri și uneltele necesare
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shoponline.backend_auth.dto.AuthRequest;
import com.shoponline.backend_auth.dto.AuthResponse;
import com.shoponline.backend_auth.util.JwtUtil;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    // Injectăm uneltele de care avem nevoie:
    
    // 1. AuthenticationManager: "Managerul" din Spring Security 
    //    care se ocupă efectiv de validarea parolei.
    @Autowired
    private AuthenticationManager authenticationManager;

    // 2. UserDetailsService: Serviciul nostru (din SecurityConfig)
    //    care știe cum să găsească un utilizator în baza de date.
    @Autowired
    private UserDetailsService userDetailsService;

    // 3. JwtUtil: Serviciul nostru (pe care l-am creat) 
    //    care știe să genereze token-uri.
    @Autowired
    private JwtUtil jwtUtil;

    // Am schimbat metoda de login:
    @PostMapping("/login")
    // @RequestBody îi spune lui Spring: "Te rog, ia JSON-ul din cerere
    // și transformă-l într-un obiect AuthRequest."
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequest authRequest) throws Exception {
        
        // PASUL A: Verifică dacă datele sunt corecte
        try {
            // Îi cerem managerului să autentifice un token cu username-ul și parola primite
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );
        } catch (Exception e) {
            // Dacă managerul dă o eroare (ex: parolă greșită), 
            // prindem eroarea și returnăm un 401 Unauthorized (Acces Neautorizat).
            return ResponseEntity.status(401).body("Utilizator sau parolă incorectă");
        }

        // PASUL B: Dacă am trecut de 'try-catch', înseamnă că logarea a reușit.
        
        // Acum, încărcăm detaliile complete ale utilizatorului (pentru a-i afla rolul)
        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authRequest.getUsername());

        // PASUL C: Generăm token-ul ("biletul VIP")
        final String jwt = jwtUtil.generateToken(userDetails);
        
        // PASUL D: Extragem rolul (ex: "ROLE_ADMIN")
        String role = userDetails.getAuthorities().iterator().next().getAuthority();

        // PASUL E: Returnăm un răspuns 200 OK
        // Creăm un obiect AuthResponse nou, care conține token-ul și rolul,
        // și îl trimitem ca JSON către Angular.
        return ResponseEntity.ok(new AuthResponse(jwt, role, userDetails.getUsername()));
    }
}
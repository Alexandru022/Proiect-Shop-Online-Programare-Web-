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

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

   
    @PostMapping("/login")
 
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequest authRequest) throws Exception {
        
    
        try {
            
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );
        } catch (Exception e) {
           
            return ResponseEntity.status(401).body("Utilizator sau parolă incorectă");
        }

        
        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authRequest.getUsername());

     
        final String jwt = jwtUtil.generateToken(userDetails);
        
       
        String role = userDetails.getAuthorities().iterator().next().getAuthority();

       
        return ResponseEntity.ok(new AuthResponse(jwt, role, userDetails.getUsername()));
    }
}
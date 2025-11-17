package com.shoponline.backend_auth.util; // <-- Am scos underscore-ul

import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails; // <-- Am schimbat importul din 'javax' în 'jakarta'
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Service
public class JwtUtil {

    // Injectăm cheia secretă din application.properties
    @Value("${jwt.secret}")
    private String secretBase64;

    private SecretKey secretKey;

    // Inițializăm cheia secretă după ce proprietățile sunt injectate
    @PostConstruct // <-- Am schimbat adnotarea din 'javax' în 'jakarta'
    protected void init() {
        this.secretKey = Keys.hmacShaKeyFor(Base64.getDecoder().decode(secretBase64));
    }

    // Extrage username-ul din token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Extrage data expirării
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        // Folosim noul parser
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload();
    }

    // Verifică dacă token-ul a expirat
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Generează un token nou pentru un utilizator
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        // Putem adăuga și rolurile în token dacă dorim
        String role = userDetails.getAuthorities().iterator().next().getAuthority();
        claims.put("role", role);
        
        return createToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject) // Aici setăm username-ul
                .setIssuedAt(new Date(System.currentTimeMillis()))
                // Setează expirarea (ex: 10 ore)
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) 
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    // Validează token-ul
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}
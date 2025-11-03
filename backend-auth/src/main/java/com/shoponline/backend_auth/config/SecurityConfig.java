package com.shoponline.backend_auth.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration 
@EnableWebSecurity 
public class SecurityConfig {

    // 1. Definirea Regulilor de Securitate și Acces
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Dezactivăm CSRF (Angular trimite cereri AJAX, nu formulare clasice)
            .csrf(AbstractHttpConfigurer::disable) 
            // Aplicăm configurația CORS (pentru Angular)
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            
            // Definirea regulilor de autorizare bazate pe URL-uri
            .authorizeHttpRequests(authorize -> authorize
                // Endpoint-ul de login este accesibil tuturor
                .requestMatchers("/api/auth/login").permitAll() 
                // Doar utilizatorii cu rolul "ADMIN" au acces la aceste URL-uri
                .requestMatchers("/api/admin/**").hasRole("ADMIN") 
                // Utilizatorii cu rolurile "CLIENT" SAU "ADMIN" au acces
                .requestMatchers("/api/client/**").hasAnyRole("CLIENT", "ADMIN") 
                // Toate celelalte cereri necesită autentificare
                .anyRequest().authenticated() 
            )
            // Configurăm autentificarea de bază (Username/Parolă)
            .httpBasic(basic -> {}); 
            
        return http.build();
    }
    
    // 2. Criptarea Parolelor
    @Bean
    public PasswordEncoder passwordEncoder() {
        // BCrypt este cel mai recomandat algoritm de hashing
        return new BCryptPasswordEncoder(); 
    }
    
    // 3. Crearea Utilizatorilor de Test (În Memorie)
    @Bean
    public UserDetailsService users() {
        // Utilizator Administrator: username=admin, parola=adminpass
        UserDetails admin = User.builder()
            .username("admin")
            .password(passwordEncoder().encode("adminpass")) 
            .roles("ADMIN")
            .build();
        
        // Utilizator Client: username=client, parola=clientpass
        UserDetails client = User.builder()
            .username("client")
            .password(passwordEncoder().encode("clientpass"))
            .roles("CLIENT")
            .build();

        // Returnează o listă de utilizatori stocată în memoria aplicației
        return new InMemoryUserDetailsManager(admin, client);
    }
    
    // 4. Configurarea CORS (Cross-Origin Resource Sharing)
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Specifică de unde (ce domeniu/port) poate veni cererea Angular
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200")); 
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*")); // Permite toate headerele
        configuration.setAllowCredentials(true); // Permite trimiterea de cookies/detalii de autentificare
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
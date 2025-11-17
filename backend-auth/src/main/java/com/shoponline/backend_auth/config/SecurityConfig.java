package com.shoponline.backend_auth.config;

import java.util.Arrays; // <-- Importă filtrul

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder; // <-- Import nou (Stateless)
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.shoponline.backend_auth.filter.JwtRequestFilter;
import com.shoponline.backend_auth.model.User; // <-- Import nou (pentru filtru)
import com.shoponline.backend_auth.repository.UserRepository;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private JwtRequestFilter jwtRequestFilter; // <-- Injectăm filtrul nostru

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/api/auth/login").permitAll() // Permitem endpoint-ul de login
                .requestMatchers("/h2-console/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/client/**").hasAnyRole("CLIENT", "ADMIN")
                .anyRequest().authenticated()
            )
            
            // SCHIMBARE MAJORĂ: Setăm sesiunea ca STATELESS (fără stare)
            // Nu mai folosim httpBasic()
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        
        // Adăugăm filtrul nostru JWT *înainte* de filtrul de autentificare standard
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        http.headers(headers -> headers.frameOptions(frameOptions -> frameOptions.disable()));

        return http.build();
    }

    // Expunem AuthenticationManager ca un Bean (necesar pentru AuthController)
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
    
    // --- Restul fișierului rămâne la fel ---

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    

    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
        // IMPORTANT: Trebuie să permitem și header-ul "Authorization" (pentru Bearer Token)
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        // (Această metodă rămâne exact la fel ca înainte, adaugă userii)
        return args -> {
            if (userRepository.findByUsername("admin").isEmpty()) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode("adminpass"));
                admin.setRole("ROLE_ADMIN");
                userRepository.save(admin);
                System.out.println(">>> Utilizatorul ADMIN a fost creat.");
            }
            if (userRepository.findByUsername("client").isEmpty()) {
                User client = new User();
                client.setUsername("client");
                client.setPassword(passwordEncoder.encode("clientpass"));
                client.setRole("ROLE_CLIENT");
                userRepository.save(client);
                System.out.println(">>> Utilizatorul CLIENT a fost creat.");
            }
        };
    }
}
package com.shoponline.backend_auth.service;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.shoponline.backend_auth.model.User;
import com.shoponline.backend_auth.repository.UserRepository;

@Service // Marchează clasa ca un serviciu Spring
public class AppUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository; // Injectăm repository-ul

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Aceasta este exact logica pe care o aveai în SecurityConfig
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Utilizatorul nu a fost găsit: " + username));
        
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(user.getRole()))
        );
    }
}
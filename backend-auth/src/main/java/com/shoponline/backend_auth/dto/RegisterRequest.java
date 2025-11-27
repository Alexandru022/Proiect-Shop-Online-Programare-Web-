package com.shoponline.backend_auth.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String password;
    //  aici pe viitor (email, nume, etc.)
}
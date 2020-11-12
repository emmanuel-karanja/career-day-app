package com.careerday.careerdayapp.DTOs;

import lombok.Data;

@Data
public class JwtAuthenticationResponse {
    private String accessToken;
    private String tokenType="Bearer";
    
    private Long  userId;
    private String email;
    private String firstName;
    private String lastName;

    public JwtAuthenticationResponse(String accessToken){
        this.accessToken=accessToken;
    }
}

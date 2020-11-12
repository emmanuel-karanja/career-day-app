package com.careerday.careerdayapp.DTOs;

import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.util.StringUtils;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class LoginRequest {
   
    @NotBlank
    @Size(max=40)
    @Email
    private String email;

    @NotBlank
    @Size(min=6,max=20)

    private String password;

    
}

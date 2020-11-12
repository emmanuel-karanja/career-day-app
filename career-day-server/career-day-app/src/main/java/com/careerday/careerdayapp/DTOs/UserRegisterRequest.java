package com.careerday.careerdayapp.DTOs;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserRegisterRequest {
    @NotBlank
    @Size(min=4,max=40)
    private String  firstName;

    @NotBlank
    @Size(min=4,max=40)
    private String lastName;
    
    private String phone;

    @NotBlank
    @Email
    @Size(max=40)
    private String email;

    @NotBlank
    @Size(min=6,max=20)
    private String password;
    
}

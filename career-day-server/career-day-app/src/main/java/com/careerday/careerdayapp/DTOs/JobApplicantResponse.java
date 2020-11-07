package com.careerday.careerdayapp.DTOs;

import lombok.Data;

@Data
public class JobApplicantResponse {
    private String firstName;
    private String lastName;
    private String email;
    private String levelOfEducation;
    private String phone;
    private Integer yearsOfExperience;
}

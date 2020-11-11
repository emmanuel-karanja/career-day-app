package com.careerday.careerdayapp.DTOs;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobApplicantResponse {
	
	
	private Long applicantId;
	
	
    private String firstName;
	
    private String lastName;
	
	
	
    private String email;
    
    @JsonProperty("education")
    private String levelOfEducation;
    
    
    private String phone;
    
    
    private Integer yearsOfExperience;
}

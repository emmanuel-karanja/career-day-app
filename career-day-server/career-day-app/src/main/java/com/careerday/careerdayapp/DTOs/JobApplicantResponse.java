package com.careerday.careerdayapp.DTOs;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobApplicantResponse {
	
	@JsonProperty("ApplicantId")
	private Long applicantId;
	
	@JsonProperty("FirstName")
    private String firstName;
	@JsonProperty("LastName")
    private String lastName;
	
	
	@JsonProperty("Email")
    private String email;
    
    @JsonProperty("Education")
    private String levelOfEducation;
    
    @JsonProperty("PhoneNumber")
    private String phone;
    
    @JsonProperty("YearsOfExperience")
    private Integer yearsOfExperience;
}

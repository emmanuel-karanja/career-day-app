package com.careerday.careerdayapp.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonProperty;

//a response object that contains data mapped from the JobApplication entity

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobApplicationResponse {
	
	@JsonProperty("ApplicationId")
    private Long applicationId;
	
    private Instant applicationDate;
	
    private String jobName;
	
    private Long jobId;
	
    private String jobStatus;
	
	private Long applicantId;
	
	private String applicantFirstName;
	
	private String applicantLastName;

    private String applicantEmail;
    
}

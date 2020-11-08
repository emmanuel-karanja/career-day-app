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
	
	@JsonProperty("AppliedOn")
    private Instant applicationDate;
	
	@JsonProperty("JobTitle")
    private String jobName;
	
	@JsonProperty("JobId")
    private Long jobId;
	
	@JsonProperty("JobStatus")
    private String jobStatus;
	
	@JsonProperty("ApplicantId")
	private Long applicantId;
	
	@JsonProperty("FirstName")
	private String applicantFirstName;
	
	@JsonProperty("LastName")
	private String applicantLastName;
	
	@JsonProperty("Email")
    private String applicantEmail;
    
}

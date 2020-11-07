package com.careerday.careerdayapp.DTOs;

import lombok.Data;
import java.time.LocalDate;

//a response object that contains data mapped from the JobApplication entity

@Data
public class JobApplicationResponse {
    private Long id;
    private LocalDate applicationDate;
    private String jobName;
    private Long jobId;
    private String jobStatus;
	private Long applicantId;
	private String applicantFirstName;
	private String applicantLastName;
    private String applicantEmail;
    
}

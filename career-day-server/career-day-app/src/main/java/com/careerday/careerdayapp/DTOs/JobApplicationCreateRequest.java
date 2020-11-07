package com.careerday.careerdayapp.DTOs;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

public class JobApplicationCreateRequest{
	
	@NotNull
	@Positive
	@NotBlank
	private Long jobId;
	
	public Long getJobId(){
		 return jobId;
	}
	public void setJobId(Long jobId){
		this.jobId=jobId;
	}
}
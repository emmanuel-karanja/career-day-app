package com.careerday.careerdayapp.DTOs;

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
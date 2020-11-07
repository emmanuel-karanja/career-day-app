package com.careerday.careerdayapp.DTOs;

public class JobApplicationUpdateRequest{
	
	@NotBlank
	@NotEmpty
	@ValueOfEnum(enumClass=JobApplicationStatus.class)
	private String status;
	
	public String getStatus(){
		 return status;
	}
	
	public void  setStatus(String status){
		this.status=status;
	}
}
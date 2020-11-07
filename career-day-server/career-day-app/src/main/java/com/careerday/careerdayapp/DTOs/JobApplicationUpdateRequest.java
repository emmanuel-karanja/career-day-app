package com.careerday.careerdayapp.DTOs;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

import com.careerday.careerdayapp.Entities.JobApplicationStatus;
import com.careerday.careerdayapp.Validation.ValueOfEnum;

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
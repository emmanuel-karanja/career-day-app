package com.careerday.careerdayapp.DTOs;

import lombok.Data;
import javax.validation.constraints.*;

import com.careerday.careerdayapp.Entities.JobTypeName;
import com.careerday.careerdayapp.Entities.JobStatus;
import com.careerday.careerdayapp.Validation.ValueOfEnum;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class JobUpdateRequest {
    @NotEmpty
    @NotBlank
    @Size(min = 5)
    private String name;

    @NotEmpty
    @NotBlank
    @Size(min = 20)
    private String description;

    @NotEmpty
    @NotBlank
    @Size(min = 5, max = 150)
    private String summary;

    @NotNull
    @Future
    private LocalDate interviewDate;

    
    @NotNull
    private LocalTime startTime;

    
    @NotNull
    private LocalTime endTime;
	
	@NotEmpty
	@NotBlank
	@ValueOfEnum(enumClass=JobTypeName.class)
    private String jobType;
	
	@NotEmpty
	@NotBlank
	@ValueOfEnum(enumClass=JobStatus.class)
	private String status;
    

}

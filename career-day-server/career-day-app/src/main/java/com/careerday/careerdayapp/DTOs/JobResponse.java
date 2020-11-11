package com.careerday.careerdayapp.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

import com.careerday.careerdayapp.Entities.JobStatus;
import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobResponse {
	
	@JsonProperty("jobId")
    private Long id;
    private String name;
    private String type;
    private String summary;
    private String description;
    
    @JsonProperty("InterviewOn")
    private LocalDate interviewDate;
    
    @JsonProperty("StartTime")
    private LocalTime startTime;
    
    @JsonProperty("EndTime")
    private LocalTime endTime;
    private JobStatus status;
}

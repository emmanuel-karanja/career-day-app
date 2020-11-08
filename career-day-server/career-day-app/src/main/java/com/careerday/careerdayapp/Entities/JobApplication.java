package com.careerday.careerdayapp.Entities;

import java.time.Instant;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class JobApplication{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long applicationId;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="applicantId")
	private JobApplicant applicant;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="jobId")
	private Job job;
	
	@Enumerated(EnumType.STRING)
	private JobApplicationStatus status;
	
	private Instant appliedAt;
	
	public JobApplication(JobApplicant applicant,Job job){
		this.applicant=applicant;
		this.job=job;
		this.appliedAt=Instant.now();
		this.status=JobApplicationStatus.ACTIVE;
	}
}
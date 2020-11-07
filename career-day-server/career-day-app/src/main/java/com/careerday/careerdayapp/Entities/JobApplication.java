package com.careerday.careerdayapp.Entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;



@Entity
@Table(name = "job_application")
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "job_id" nullable=false)
    private Job job;

    @ManyToOne
    @JoinColumn(name = "applicant_id" nullable=false)
    private JobApplicant applicant;

    @Column(name = "application_date", columnDefinition = "TIMESTAMP")
    private LocalDateTime applicationDate;
	
	@Enumerated(EnumType.STRING)
	private JobApplicationStatus status;
	
	public enum JobApplicationStatus{
		ACTIVE,
		CANCELLED,
		EXPIRED		
	}
	
	public JobApplication(){}
	
	public JobApplication(Job job, JobApplicant jobApplicant){
		this.job=job;
		this.applicant=jobApplicant;
		this.status=JobApplicationStatus.ACTIVE;
		this.applicationDate=LocalDate.now();
	}
	
	public boolean isActive(){
		 if (status == JobApplicationStatus.EXPIRED || status == JobApplicationStatus.CANCELLED) return false;
		 return true;
	}
	
	 public Long getId(){
		  return id;
	 }
	 
	 public void setId(Long id){
		  this.id=id;
	 }
	 
	 public LocalDate getApplicationDate(){
		  return applicationDate;
	 }
	 
	 public void setApplicationDate(LocalDate applicationDate){
		  this.applicationDate=applicationDate;
	 }
	 public void getStatus(){
		  return status;
	 }
	 
	 public void setStatus(JobApplicationStatus status)
	 {
		 this.status=status;
	 }
	
	public Job getJob(){
		 return job;
	}
	
	public void setJob(Job job){
		 this.job=job;
    }
	
	public JobApplication getApplicant(){
		 return applicant;
    }
	
	public void setApplicant(JobApplicant applicant){
		 this.applicant=applicant;
	}
	
	
}
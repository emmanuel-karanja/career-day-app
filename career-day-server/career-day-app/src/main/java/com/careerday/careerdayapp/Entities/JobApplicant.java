package com.careerday.careerdayapp.Entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.NaturalId;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
//@Table(uniqueConstraints = { @UniqueConstraint(columnNames = { "phone" }),
//		@UniqueConstraint(columnNames = { "email" }) })
public class JobApplicant{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long applicantId;
	
	private String firstName;
	
	private String lastName;
	
	@NaturalId
	private String email;
	
	@NaturalId
	private String phone;
	
	@Enumerated(EnumType.STRING)
	private LevelOfEducation levelOfEducation;
	
	private Integer yearsOfExperience;
	
	
	@OneToMany(mappedBy="applicant", orphanRemoval=true, cascade=CascadeType.ALL)
	private List<JobApplication> applications=new ArrayList<>();
	
	public  List<JobApplication> getApplications(){
		return applications;
	}
	
	public void setApplications(List<JobApplication> applications){
		this.applications=applications;
	}
	
	public void addApplication(JobApplication application){
		applications.add(application);
		application.setApplicant(this);
	}
	
	public void removeApplication(JobApplication application){
		applications.remove(application);
		application.setApplicant(null);
	}
	
}
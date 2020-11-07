package com.careerday.careerdayapp.Entities;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

@Setter
@Getter
@NoArgsConstructor
@Accessors(chain = true)
@Table(name = "job_applicant",uniqueConstraints = { @UniqueConstraint(columnNames = { "phone_number" }),
		@UniqueConstraint(columnNames = { "email" }) })
@Entity
public class JobApplicant {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   @Column(name = "applicant_id")
   private Long id;

   @Column(name = "first_name")
   private String firstName;

   @Column(name = "last_name")
   private String lastName;

   @Column(name = "email", unique=true)
   private String email;

   @Enumerated(EnumType.STRING)
   @Column(name = "level_of_education")
   private LevelOfEducation levelofEducation;

   @Column(name = "phone_number", unique=true)
   private String phone;

   @Column(name = "years_of_experience")
   private Integer yearsOfExperience;

   @OneToMany(mappedBy="applicant",fetch = FetchType.EAGER,cascade = CascadeType.ALL, orphanRemoval = true )
   private List<JobApplication> applications = new ArrayList<>();
   
   
   public List<JobApplication> getApplications(){
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
		if(applications == null || applications.size() ==0) return; 
	   applications.remove(application);
	   application.setApplicant(null);
	}

}
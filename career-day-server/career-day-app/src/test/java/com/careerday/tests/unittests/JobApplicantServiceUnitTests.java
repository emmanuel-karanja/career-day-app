package com.careerday.tests.unittests;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.careerday.careerdayapp.DTOs.JobApplicantRegisterRequest;
import com.careerday.careerdayapp.DTOs.JobApplicantResponse;
import com.careerday.careerdayapp.DTOs.JobApplicantUpdateRequest;
import com.careerday.careerdayapp.DTOs.JobApplicationCreateRequest;
import com.careerday.careerdayapp.DTOs.JobResponse;
import com.careerday.careerdayapp.Entities.Job;
import com.careerday.careerdayapp.Entities.JobApplicant;
import com.careerday.careerdayapp.Entities.JobApplication;
import com.careerday.careerdayapp.Entities.JobApplicationStatus;
import com.careerday.careerdayapp.Entities.LevelOfEducation;
import com.careerday.careerdayapp.Exceptions.ResourceNotFoundException;
import com.careerday.careerdayapp.Repositories.JobApplicantRepository;
import com.careerday.careerdayapp.Repositories.JobApplicationRepository;
import com.careerday.careerdayapp.Repositories.JobRepository;
import com.careerday.careerdayapp.Services.JobApplicantService;

@ExtendWith(MockitoExtension.class)
class JobApplicantServiceUnitTests {

	@Mock
	private JobApplicantRepository jobApplicantRepository;
	
	@Mock
	private JobApplicationRepository jobApplicationRepository;
	
	@Mock 
	private JobRepository jobRepositry;
	
	@InjectMocks
	private JobApplicantService jobApplicantService;
	
	@Test
	void shouldCreateApplicantSuccessfully() {
		JobApplicantRegisterRequest request=new JobApplicantRegisterRequest();
		
		request.setEmail("manolohawks@mm1.com");
		request.setFirstName("Mordecai");
		request.setLastName("Rojas");
		request.setLevelOfEducation("GRADUATE");
		request.setYearsOfExperience(3);
        request.setPhone("0712400896");
        
        JobApplicant applicant=new JobApplicant();
        applicant.setEmail("manolohawks@mm1.com");
        applicant.setFirstName("Mordecai");
        applicant.setLastName("Rojas");
        applicant.setLevelOfEducation(LevelOfEducation.GRADUATE);
        applicant.setYearsOfExperience(3);
        applicant.setPhone("0712400896");
        
       given(jobApplicantRepository.save(applicant)).willReturn(applicant);

		JobApplicantResponse savedApplicant=jobApplicantService.create(request);
		
		assertThat(savedApplicant).isNotNull();
		
		verify(jobApplicantRepository).save(any(JobApplicant.class));
		
	}
	
	@Test 
	void shouldUpdateApplicantSuccessfully(){
		final Long id=1L;
       JobApplicant applicant=new JobApplicant();
		
		applicant.setEmail("manolohawks@mm1.com");
		applicant.setFirstName("Mordecai");
		applicant.setLastName("Rojas");
		applicant.setLevelOfEducation(LevelOfEducation.GRADUATE);
		applicant.setYearsOfExperience(3);
        applicant.setPhone("0712400896");
        applicant.setApplicantId(id);
        
      JobApplicantUpdateRequest updated=new JobApplicantUpdateRequest();
		
	
		updated.setFirstName("Mordecai");
		updated.setLastName("Rojas");
		updated.setLevelOfEducation("GRADUATE");
		updated.setYearsOfExperience(3);
     
		given(jobApplicantRepository.findById(id)).willReturn(Optional.of(applicant));
		given(jobApplicantRepository.save(applicant)).willReturn(applicant);
		
		JobApplicantResponse expected=jobApplicantService.update(id,updated);
		
		assertThat(expected).isNotNull();
		
		verify(jobApplicantRepository).save(any(JobApplicant.class));


	}
	
	@Test
	void shouldFindApplicantByIdWithValidId() {
		
		 JobApplicant applicant=new JobApplicant();
	     applicant.setEmail("manolohawks@mm1.com");
	     applicant.setFirstName("Mordecai");
	     applicant.setLastName("Rojas");
	     applicant.setLevelOfEducation(LevelOfEducation.GRADUATE);
	     applicant.setYearsOfExperience(3);
	     applicant.setPhone("0712400896");
		final Long id=1L;
		
        given(jobApplicantRepository.findById(id)).willReturn(Optional.of(applicant));
		
		//action
		final JobApplicantResponse expected=jobApplicantService.getById(id);
		
		//assertion
		assertThat(expected).isNotNull();
	}
	
	@Test
	void shouldThrowResourceNotFoundExceptionWithInvalidId() {
        final Long id=2L;
		
		given(jobApplicantRepository.findById(id)).willReturn(Optional.empty());
		
		assertThrows(ResourceNotFoundException.class,()->{
			jobApplicantService.getById(id);
		});
	}
	
	@Test
	void shouldThrowDuplicateEntityExceptionWithExistingEmail() {
		
	}
	
	@Test
	void shouldDeleteApplicantSuccessfullyWithValidId() {
		
		JobApplicant applicant=new JobApplicant();
		 
	     applicant.setEmail("manolohawks@mm1.com");
	     applicant.setFirstName("Mordecai");
	     applicant.setLastName("Rojas");
	     applicant.setLevelOfEducation(LevelOfEducation.GRADUATE);
	     applicant.setYearsOfExperience(3);
	     applicant.setPhone("0712400896");
		
		final Long id=1L;
		
        given(jobApplicantRepository.findById(id)).willReturn(Optional.of(applicant));
		
		jobApplicantService.delete(id);
		jobApplicantService.delete(id);
		
	    
		
		verify(jobApplicantRepository,times(2)).delete(applicant);
	}
	
	
	
	@Test
	void shouldFindAllApplicants() {
		JobApplicant applicant=new JobApplicant();
	     applicant.setEmail("manolohawks@mm1.com");
	     applicant.setFirstName("Mordecai");
	     applicant.setLastName("Rojas");
	     applicant.setLevelOfEducation(LevelOfEducation.GRADUATE);
	     applicant.setYearsOfExperience(3);
	     applicant.setPhone("0712400896");
		
	     JobApplicant applicant1=new JobApplicant();
	     applicant1.setEmail("manolohawks@mm1.com");
	     applicant1.setFirstName("Mordecai");
	     applicant1.setLastName("Rojas");
	     applicant1.setLevelOfEducation(LevelOfEducation.GRADUATE);
	     applicant1.setYearsOfExperience(3);
	     applicant1.setPhone("0712400896");
	     
	     List<JobApplicant> applicants=new ArrayList<>();
			
	     applicants.add(applicant);
	     applicants.add(applicant1);
			
		given(jobApplicantRepository.findAll()).willReturn(applicants);
			
		List<JobApplicantResponse> expected=jobApplicantService.getAllApplicants();
			
		assertThat(expected).isNotNull();
		assertThat(expected.size()).isEqualTo(2);
		
	}
	
}

package com.careerday.tests.unittests;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.mockito.junit.jupiter.MockitoExtension;

import com.careerday.careerdayapp.DTOs.JobCreateRequest;
import com.careerday.careerdayapp.DTOs.JobResponse;
import com.careerday.careerdayapp.DTOs.JobUpdateRequest;
import com.careerday.careerdayapp.Entities.Job;
import com.careerday.careerdayapp.Entities.JobStatus;
import com.careerday.careerdayapp.Entities.JobTypeName;
import com.careerday.careerdayapp.Entities.LevelOfEducation;
import com.careerday.careerdayapp.Exceptions.DuplicateEntityException;
import com.careerday.careerdayapp.Exceptions.ResourceNotFoundException;
import com.careerday.careerdayapp.Repositories.JobRepository;
import com.careerday.careerdayapp.Services.JobService;

@ExtendWith(MockitoExtension.class)
class JobServiceUnitTests {

	@Mock
	private JobRepository jobRepository;
	
	@InjectMocks
	private JobService jobService;
	
	@Before
	void Before() {
		
	}
	
	
	@Test
	void shouldCreateJobSuccessfully() {
		final JobCreateRequest job=new JobCreateRequest();
		job.setName("job1");
		job.setDescription("We want a front-end ninja with at least 3 years experience in React and Redux");
		job.setSummary("Front-end Ninja wanted");
		job.setInterviewDate(LocalDate.of(2020, 12, 12));
		job.setStartTime(LocalTime.of(10, 00));
		job.setEndTime(LocalTime.of(17, 00));
		job.setLevelOfEducation("GRADUATE");
		job.setJobType("UI_ENGINEER");
		
		final Job job1=new Job();

		job1.setName("job1");
		job1.setDescription("We want a front-end ninja with at least 3 years experience in React and Redux");
		job1.setSummary("Front-end Ninja wanted");
		job1.setInterviewAt(LocalDate.of(2020, 12, 12));
		job1.setInterviewStartTime(LocalTime.of(10, 00));
		job1.setInterviewEndTime(LocalTime.of(17, 00));
		job1.setLevelOfEducation(LevelOfEducation.GRADUATE);
		job1.setStatus(JobStatus.ACTIVE);
		job1.setType(JobTypeName.UI_ENGINEER);
		
		
		given(jobRepository.save(job1)).willReturn(job1);
		
		JobResponse savedJob=jobService.create(job);
		
		assertThat(savedJob).isNotNull();
		
		verify(jobRepository).save(any(Job.class));
	}
	
  /* @Test
	void shouldThrowDuplicateEntityExceptionWhenSaveJobWithExistingInterviewAt() {
	   final JobCreateRequest job=new JobCreateRequest();
		job.setName("UI Dude");
		job.setDescription("We want a front-end ninja with at least 3 years experience in React and Redux");
		job.setSummary("Front-end Ninja wanted");
		job.setInterviewDate(LocalDate.of(2020, 12, 21));
		job.setStartTime(LocalTime.of(10, 00));
		job.setEndTime(LocalTime.of(17, 00));
		job.setLevelOfEducation("GRADUATE");
		job.setJobType("UI_ENGINEER");
		
		Job aJob=convertFromDTO(job);
		
		given(jobRepository.findByInterviewAt(job.getInterviewDate())).willReturn(Optional.of(aJob));
		
		assertThrows(DuplicateEntityException.class,()->{
	     	jobService.create(job);
		});
		
		verify(jobRepository,never()).save(any(Job.class));
		
	}*/
	
	
	@Test 
	void shouldGetAllJobs(){
		
		final Job job=new Job();
		job.setName("UI Dude");
		job.setDescription("We want a front-end ninja with at least 3 years experience in React and Redux");
		job.setSummary("Front-end Ninja wanted");
		job.setInterviewAt(LocalDate.of(2020, 12, 21));
		job.setInterviewStartTime(LocalTime.of(10, 00));
		job.setInterviewEndTime(LocalTime.of(17, 00));
		job.setLevelOfEducation(LevelOfEducation.GRADUATE);
		job.setType(JobTypeName.UI_ENGINEER);
		
		final Job job1=new Job();
		job1.setName("API Guy");
		job1.setDescription("We want a front-end ninja with at least 3 years experience in React and Redux");
		job1.setSummary("Front-end Ninja wanted");
		job1.setInterviewAt(LocalDate.of(2020, 12, 12));
		job1.setInterviewStartTime(LocalTime.of(10, 00));
		job1.setInterviewEndTime(LocalTime.of(17, 00));
		job1.setLevelOfEducation(LevelOfEducation.POST_GRADUATE);
		job1.setType(JobTypeName.API_ENGINEER);
		
		List<Job> jobs=new ArrayList<>();
		
		jobs.add(job1); 
		jobs.add(job);
		
		given(jobRepository.findAll()).willReturn(jobs);
		
		List<JobResponse> expected=jobService.getAllJobs();
		
		assertThat(expected).isNotNull();
		assertThat(expected.size()).isEqualTo(2);
		
	}
	
	@Test
	void shouldUpdateJobGivenAValidJobUpdateRequest() {
		 final JobCreateRequest job=new JobCreateRequest();
			job.setName("UI Dude");
			job.setDescription("We want a front-end ninja with at least 3 years experience in React and Redux");
			job.setSummary("Front-end Ninja wanted");
			job.setInterviewDate(LocalDate.of(2020, 12, 21));
			job.setStartTime(LocalTime.of(10, 00));
			job.setEndTime(LocalTime.of(17, 00));
			job.setLevelOfEducation("GRADUATE");
			job.setJobType("UI_ENGINEER");
			
		final JobUpdateRequest updated=new JobUpdateRequest();
		    
		    updated.setName("UI Dude");
		    updated.setDescription("We want a front-end ninja with at least 3 years experience in React and Redux");
		    updated.setSummary("Front-end Ninja wanted");
			updated.setInterviewDate(LocalDate.of(2020, 12, 21));
			updated.setStartTime(LocalTime.of(10, 00));
			updated.setEndTime(LocalTime.of(17, 00));
			updated.setLevelOfEducation("GRADUATE");
			updated.setStatus("ACTIVE");
			updated.setJobType("UI_ENGINEER");
			
		    final Long id=1L;
			
			Job aJob=convertFromDTO(job);
			given(jobRepository.save(aJob)).willReturn(aJob);
			given(jobRepository.findById(id)).willReturn(Optional.of(aJob));
			
			final JobResponse expected=jobService.update(1L,updated);
			
			assertThat(expected).isNotNull();
			
			verify(jobRepository).save(any(Job.class));
			
	}
	
	@Test
	void shouldDeleteJobGivenValidJobId() {
		final Long id=1L;
		
		final Job job=new Job();
		job.setName("UI Dude");
		job.setDescription("We want a front-end ninja with at least 3 years experience in React and Redux");
		job.setSummary("Front-end Ninja wanted");
		job.setInterviewAt(LocalDate.of(2020, 12, 21));
		job.setInterviewStartTime(LocalTime.of(10, 00));
		job.setInterviewEndTime(LocalTime.of(17, 00));
		job.setLevelOfEducation(LevelOfEducation.GRADUATE);
		job.setType(JobTypeName.UI_ENGINEER);
		
		given(jobRepository.findById(id)).willReturn(Optional.of(job));
		
		jobService.delete(id);
		jobService.delete(id);
		
	    
		
		verify(jobRepository,times(2)).delete(job);
	}
	
	@Test 
	void shouldThrowResourceNotFoundExceptionGivenANonExistentJobId(){
		
		final Long id=2L;
		
		given(jobRepository.findById(id)).willReturn(Optional.empty());
		
		assertThrows(ResourceNotFoundException.class,()->{
			jobService.getById(id);
		});
	}
	
	@Test
	void shouldFindJobById() {
		
		//arrange
		final Long id=1L;
		final Job job=new Job();
		job.setName("job1");
		job.setDescription("We want a front-end ninja with at least 3 years experience in React and Redux");
		job.setSummary("Front-end Ninja wanted");
		job.setInterviewAt(LocalDate.of(2020, 12, 12));
		job.setInterviewStartTime(LocalTime.of(10, 00));
		job.setInterviewEndTime(LocalTime.of(17, 00));
		job.setLevelOfEducation(LevelOfEducation.GRADUATE);
		job.setType(JobTypeName.UI_ENGINEER);
		
		given(jobRepository.findById(id)).willReturn(Optional.of(job));
		
		//action
		final JobResponse expected=jobService.getById(id);
		
		//assertion
		assertThat(expected).isNotNull();
				               
	}
	
	@Test
	void shouldThrowResourceNotFoundExceptionGivenaAnInvalidJobId() {
		final Long invalidId=15L;
		
        given(jobRepository.findById(invalidId)).willReturn(Optional.empty());
		
		assertThrows(ResourceNotFoundException.class,()->{
			jobService.getById(invalidId);
		});
		
	}
	
	private Job convertFromDTO(JobCreateRequest jobDto){
		Job newJob=new Job();
		newJob.setName(jobDto.getName());
		newJob.setDescription(jobDto.getDescription());
		newJob.setSummary(jobDto.getSummary());
		newJob.setInterviewAt(jobDto.getInterviewDate());
		newJob.setInterviewStartTime(jobDto.getStartTime());
		newJob.setInterviewEndTime(jobDto.getEndTime());
		newJob.setStatus(JobStatus.ACTIVE);
		
		return newJob;
	}
	
	private JobResponse convertFromEntity(Job job){
		JobResponse jobResponse=new JobResponse();
		 jobResponse.setId(job.getJobId());
		 jobResponse.setName(job.getName());
		 jobResponse.setDescription(job.getDescription());
		 jobResponse.setInterviewDate(job.getInterviewAt());
		 jobResponse.setSummary(job.getSummary());
		 jobResponse.setStartTime(job.getInterviewStartTime());
		 jobResponse.setEndTime(job.getInterviewEndTime());
		 jobResponse.setStatus(job.getStatus());
		 jobResponse.setType(job.getType().name());
		 
		 return jobResponse;
		 
	}
	

}

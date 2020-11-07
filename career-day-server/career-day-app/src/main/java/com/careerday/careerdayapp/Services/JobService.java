package com.careerday.careerdayapp.Services;


import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.careerday.careerdayapp.DTOs.ApiResponse;
import com.careerday.careerdayapp.DTOs.JobCreateRequest;
import com.careerday.careerdayapp.DTOs.JobResponse;
import com.careerday.careerdayapp.DTOs.JobUpdateRequest;
import com.careerday.careerdayapp.DTOs.PagedResponse;
import com.careerday.careerdayapp.Entities.Job;
import com.careerday.careerdayapp.Entities.JobStatus;
import com.careerday.careerdayapp.Entities.JobType;
import com.careerday.careerdayapp.Exceptions.BadRequestException;
import com.careerday.careerdayapp.Exceptions.ResourceNotFoundException;
import com.careerday.careerdayapp.Repositories.JobRepository;
import com.careerday.careerdayapp.Repositories.JobTypeRepository;
import com.careerday.careerdayapp.Utils.AppConstants;




@Service
public class JobService implements IJobService{
	private final JobRepository jobRepository;
	private final JobTypeRepository jobTypeRepository;
	private final ModelMapper modelMapper;

    public static String JOB="Job";
	public static String ID="Id";
	public static String JOB_TYPE="Job Type";
	public static String TYPE="Type";
    public static String INTERVIEW_AT="interview_date";

	
	public JobService(JobRepository jobRepository,
                      JobTypeRepository jobTypeRepository,
		              ModelMapper modelMapper){
		 this.jobRepository=jobRepository;
		 this.jobTypeRepository=jobTypeRepository;
		 this.modelMapper=modelMapper;
	}
	
	@Override
	public JobResponse create(JobCreateRequest createRequest){
		 Job newJob=convertFromDTO(createRequest);
		 JobType jobType=jobTypeRepository.findByName(createRequest.getJobType())
		                 .orElseThrow(()-> new ResourceNotFoundException(JOB,TYPE,createRequest.getJobType()));
		 newJob.setJobType(jobType);
		 Job savedJob=jobRepository.save(newJob);
		 return convertFromEntity(savedJob);
	 }

    @Override
    public JobResponse update(Long id, JobUpdateRequest updateRequest){
		Job job=jobRepository.findById(id).
		         orElseThrow(()-> new ResourceNotFoundException(JOB,ID,id));
		job.setName(updateRequest.getName());
		job.setDescription(updateRequest.getDescription());
		job.setSummary(updateRequest.getSummary());
		job.setInterviewDate(updateRequest.getInterviewDate());
		job.setStartTime(updateRequest.getStartTime());
		job.setEndTime(updateRequest.getEndTime());
		job.setStatus(JobStatus.valueOf(updateRequest.getStatus()));
		
		JobType jobType=jobTypeRepository.findByName(updateRequest.getJobType())
		                .orElseThrow(()-> new ResourceNotFoundException(JOB_TYPE,TYPE,updateRequest.getJobType()));
		job.setJobType(jobType);
		
		Job savedJob=jobRepository.save(job);
		
		return convertFromEntity(savedJob);
		
	}

    @Override
    public ApiResponse delete(Long id){
		Job job=jobRepository.findById(id)
		         .orElseThrow(()->new ResourceNotFoundException(JOB,ID,id));
		jobRepository.delete(job);	
		return new ApiResponse(Boolean.TRUE, "Job successfully deleted");	
	}

    @Override
    public JobResponse getById(Long id){
		Job job= jobRepository.findById(id)
		                    .orElseThrow(()-> new ResourceNotFoundException(JOB,ID,id));
        return convertFromEntity(job);
	}

    @Override
    public PagedResponse<JobResponse> getAllJobs(int page, int size){
		validatePageNumberAndSize(page,size);
		Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, INTERVIEW_AT);

		Page<Job> jobs = jobRepository.findAll(pageable);

		List<Job> content = jobs.getNumberOfElements() == 0 ? Collections.emptyList() : jobs.getContent();
		
		List<JobResponse> response=content.stream()
				                          .map(j-> convertFromEntity(j))
				                          .collect(Collectors.toList());

		return new PagedResponse<JobResponse>(response, jobs.getNumber(), jobs.getSize(), jobs.getTotalElements(),
				jobs.getTotalPages(), jobs.isLast());
	}
	
	private Job convertFromDTO(JobCreateRequest jobDto){
		Job newJob=new Job();
		newJob.setName(jobDto.getName());
		newJob.setDescription(jobDto.getDescription());
		newJob.setSummary(jobDto.getSummary());
		newJob.setInterviewDate(jobDto.getInterviewDate());
		newJob.setStartTime(jobDto.getStartTime());
		newJob.setEndTime(jobDto.getEndTime());
		newJob.setStatus(JobStatus.ACTIVE);
		
		return newJob;
	}
	
	
	
	private JobResponse convertFromEntity(Job job){
		JobResponse jobResponse=modelMapper.map(job ,JobResponse.class);
		return jobResponse;
	}
	
	private void validatePageNumberAndSize(int page, int size) {
		if (page < 0) {
			throw new BadRequestException("Page number cannot be less than zero.");
		}

		if (size < 0) {
			throw new BadRequestException("Size number cannot be less than zero.");
		}

		if (size > AppConstants.MAX_PAGE_SIZE) {
			throw new BadRequestException("Page size must not be greater than " +AppConstants.MAX_PAGE_SIZE);
		}
	}

	
}
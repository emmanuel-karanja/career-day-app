package com.careerday.careerdayapp.Services;


import java.time.LocalDate;
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
import com.careerday.careerdayapp.DTOs.AvailabilityResponse;
import com.careerday.careerdayapp.DTOs.JobCreateRequest;
import com.careerday.careerdayapp.DTOs.JobResponse;
import com.careerday.careerdayapp.DTOs.JobUpdateRequest;
import com.careerday.careerdayapp.DTOs.PagedResponse;
import com.careerday.careerdayapp.Entities.Job;
import com.careerday.careerdayapp.Entities.JobStatus;
import com.careerday.careerdayapp.Entities.JobType;
import com.careerday.careerdayapp.Entities.JobTypeName;
import com.careerday.careerdayapp.Exceptions.BadRequestException;
import com.careerday.careerdayapp.Exceptions.DuplicateEntityException;
import com.careerday.careerdayapp.Exceptions.ResourceNotFoundException;
import com.careerday.careerdayapp.Repositories.JobRepository;
import com.careerday.careerdayapp.Repositories.JobTypeRepository;
import com.careerday.careerdayapp.Utils.AppConstants;




@Service
public class JobService implements IJobService{
	private final JobRepository jobRepository;
	//private final JobTypeRepository jobTypeRepository;
	private final ModelMapper modelMapper;

	//these would be moved to a resource bundle coz they are texts to be displayed on the UI
    public static String JOB="A Job";
	public static String ID="Id";
	public static String JOB_TYPE="Job Type";
	public static String TYPE="Type";
    public static String INTERVIEW_AT="Interviews scheduled On";

	
	public JobService(JobRepository jobRepository,
                     // JobTypeRepository jobTypeRepository,
		              ModelMapper modelMapper){
		 this.jobRepository=jobRepository;
		// this.jobTypeRepository=jobTypeRepository;
		 this.modelMapper=modelMapper;
	}
	
	@Override
	public JobResponse create(JobCreateRequest request){
		if(jobRepository.existsByInterviewAt(request.getInterviewDate())) {
			throw new DuplicateEntityException(JOB,INTERVIEW_AT,request.getInterviewDate());
		}
		 Job newJob=convertFromDTO(request);
		 newJob.setType(JobTypeName.valueOf(request.getJobType()));
		 Job savedJob=jobRepository.save(newJob);
		 return convertFromEntity(savedJob);
	 }

    @Override
    public JobResponse update(Long id, JobUpdateRequest request){
		Job job=jobRepository.findById(id).
		         orElseThrow(()-> new ResourceNotFoundException(JOB,ID,id));
		job.setName(request.getName());
		job.setDescription(request.getDescription());
		job.setSummary(request.getSummary());
		job.setInterviewAt(request.getInterviewDate());
		job.setInterviewStartTime(request.getStartTime());
		job.setInterviewEndTime(request.getEndTime());
		job.setStatus(JobStatus.valueOf(request.getStatus()));
		
		/*JobType jobType=jobTypeRepository.findByName(updateRequest.getJobType())
		                .orElseThrow(()-> new ResourceNotFoundException(JOB_TYPE,TYPE,updateRequest.getJobType()));*/
		job.setType(JobTypeName.valueOf(request.getJobType()));
		
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
		Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "interviewAt");

		Page<Job> jobs = jobRepository.findAll(pageable);

		List<Job> content = jobs.getNumberOfElements() == 0 ? Collections.emptyList() : jobs.getContent();
		
		List<JobResponse> response=content.stream()
				                          .map(j ->convertFromEntity(j))
				                          .collect(Collectors.toList());

		return new PagedResponse<JobResponse>(response, jobs.getNumber(), jobs.getSize(), jobs.getTotalElements(),
				jobs.getTotalPages(), jobs.isLast());
	}
	
	@Override
	public List<JobResponse> getAllJobs(){
		List<Job> jobs=jobRepository.findAll();
		
		List<JobResponse> jobResponses=jobs.stream()
		                                   .map(job-> convertFromEntity(job))
										   .collect(Collectors.toList());
	  return jobResponses;
	}
	
	@Override
	public AvailabilityResponse checkAvailabilityByInterviewDate(LocalDate interviewDate) {
		// TODO Auto-generated method stub
		return new AvailabilityResponse(jobRepository.existsByInterviewAt(interviewDate));
	}

	@Override
	public JobResponse getByInterviewDate(LocalDate interviewDate) {
		// TODO Auto-generated method stub
		Job job=jobRepository.findByInterviewAt(interviewDate)
				             .orElseThrow(()-> new ResourceNotFoundException(JOB,INTERVIEW_AT,interviewDate));
		return convertFromEntity(job);
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
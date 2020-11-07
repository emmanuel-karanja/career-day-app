package com.careerday.careerdayapp.Services;


import com.careerday.careerdayapp.DTOs.ApiResponse;
import com.careerday.careerdayapp.DTOs.JobApplicantRegisterRequest;
import com.careerday.careerdayapp.DTOs.JobApplicantResponse;
import com.careerday.careerdayapp.DTOs.JobApplicantUpdateRequest;
import com.careerday.careerdayapp.DTOs.JobApplicationCreateRequest;
import com.careerday.careerdayapp.DTOs.JobApplicationResponse;
import com.careerday.careerdayapp.DTOs.JobApplicationUpdateRequest;
import com.careerday.careerdayapp.DTOs.PagedResponse;
import com.careerday.careerdayapp.Entities.Job;
import com.careerday.careerdayapp.Entities.JobApplicant;
import com.careerday.careerdayapp.Entities.JobApplication;
import com.careerday.careerdayapp.Entities.JobApplicationStatus;
import com.careerday.careerdayapp.Entities.LevelOfEducation;
import com.careerday.careerdayapp.Exceptions.BadRequestException;
import com.careerday.careerdayapp.Exceptions.ResourceNotFoundException;
import com.careerday.careerdayapp.Repositories.JobApplicantRepository;
import com.careerday.careerdayapp.Repositories.JobApplicationRepository;
import com.careerday.careerdayapp.Repositories.JobRepository;
import com.careerday.careerdayapp.Utils.AppConstants;


import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class JobApplicantService implements IJobApplicantService{
	
	private final JobApplicantRepository jobApplicantRepository;
	private final ModelMapper modelMapper;
	private final JobApplicationRepository jobApplicationRepository;
	private final JobRepository jobRepository;
	
	public static String ID="id";
	public static String EMAIL="email";
	public static String APPLICANT="Job Applicant";
	public static String APPLICATION="Job Application";
	public static String FIRST_NAME="first_name";
	public static String JOB="Job";
	
	

	public JobApplicantService( JobApplicantRepository jobApplicantRepository,
		                        JobApplicationRepository jobApplicationRepository,
		                        JobRepository jobRepository,
		                        ModelMapper modelMapper){
			 this.jobApplicantRepository=jobApplicantRepository;
			 this.jobApplicationRepository=jobApplicationRepository;
			 this.jobRepository=jobRepository;
			 this.modelMapper=modelMapper;
	}
	
	
	
	@Override
	public JobApplicantResponse create(JobApplicantRegisterRequest createApplicantRequest){
		JobApplicant newApplicant=convertFromDTO(createApplicantRequest);
		jobApplicantRepository.save(newApplicant);
		
		return convertFromEntity(newApplicant);
	}
	
	@Override
	public JobApplicantResponse update(Long id,JobApplicantUpdateRequest updatedApplicant){
		JobApplicant applicant=jobApplicantRepository.findById(id).
		                          orElseThrow(()-> new ResourceNotFoundException(APPLICANT,ID,id));
		applicant.setFirstName(updatedApplicant.getFirstName());
		applicant.setLastName(updatedApplicant.getLastName());
		applicant.setLevelofEducation(LevelOfEducation.valueOf(updatedApplicant.getLevelOfEducation()));
		applicant.setYearsOfExperience(updatedApplicant.getYearsOfExperience());
		applicant.setPhone(updatedApplicant.getPhone());
		
		jobApplicantRepository.save(applicant);
		
		return convertFromEntity(applicant);
	}
	
	@Override
	public JobApplicantResponse getByEmail(String email){
		JobApplicant applicant=jobApplicantRepository.findByEmail(email)
		                       .orElseThrow(()-> new ResourceNotFoundException(APPLICANT,EMAIL,email));
		
	    return convertFromEntity(applicant);
	}

    @Override
    public JobApplicantResponse getById(Long id){
        JobApplicant applicant=jobApplicantRepository.findById(id)
                                 .orElseThrow(()-> new ResourceNotFoundException(APPLICANT, ID,id));
        return convertFromEntity(applicant);
    }
	
	@Override
	public PagedResponse<JobApplicantResponse> getAllApplicants(int page, int size){
		validatePageNumberAndSize(page,size);
		Pageable pageable=PageRequest.of(page,size,Sort.by(FIRST_NAME).descending());
		
		Page<JobApplicant> applicants = jobApplicantRepository.findAll(pageable);
		

		List<JobApplicant> content = applicants.getNumberOfElements() == 0 ? Collections.emptyList() : applicants.getContent();
		List<JobApplicantResponse> responseContent=content.stream()
		                                                  .map(a-> convertFromEntity(a))
														  .collect(Collectors.toList());

		return new PagedResponse<>(responseContent, applicants.getNumber(), applicants.getSize(), applicants.getTotalElements(),
				applicants.getTotalPages(), applicants.isLast());
		
	}
	
	@Override
	public ApiResponse delete(Long id){
		JobApplicant applicant=jobApplicantRepository.findById(id)
                                       .orElseThrow(()-> new ResourceNotFoundException(APPLICANT,ID,id));
		
		jobApplicantRepository.delete(applicant);
		                      
		return new ApiResponse(Boolean.TRUE,"Job Applicant Successfully deleted");
	}
	
	@Override
	public List<JobApplicationResponse> getAllApplications(Long id){
		JobApplicant applicant=jobApplicantRepository.findById(id)
		                                 .orElseThrow(()->new ResourceNotFoundException(APPLICANT,ID,id));
		
		List<JobApplication> applications = applicant.getApplications();
		List<JobApplicationResponse> response=applications.stream()
		                                                  .map(a->convertApplicationFromEntity(a))
														  .collect(Collectors.toList());
		
		return response;
		
	}
	
	@Override
	public JobApplicationResponse createApplication(Long applicantId,JobApplicationCreateRequest request){
		JobApplicant applicant=jobApplicantRepository.findById(applicantId)
		                                 .orElseThrow(()->new ResourceNotFoundException(APPLICANT,ID,applicantId));
		Job job=jobRepository.findById(request.getJobId())
		                                 .orElseThrow(()-> new ResourceNotFoundException(JOB,ID,request.getJobId()));
		JobApplication newApplication = new JobApplication(job,applicant);
		JobApplication savedApplication=jobApplicationRepository.save(newApplication);
		applicant.addApplication(savedApplication);
		jobApplicantRepository.save(applicant);
		
		return convertApplicationFromEntity(savedApplication);
	}

    @Override
    public JobApplicationResponse updateApplication(Long id, Long applicationId,JobApplicationUpdateRequest request){

        //JobApplicant applicant=jobApplicantRepository.findById(id)
		//                                 .orElseThrow(()->new ResourceNotFoundException(APPLICANT,ID,applicationId));
	    JobApplication application=jobApplicationRepository.findById(applicationId)
                                       .orElseThrow(()->new ResourceNotFoundException(APPLICANT,ID,applicationId));

        application.setStatus(JobApplicationStatus.valueOf(request.getStatus()));
        JobApplication updatedApplication=jobApplicationRepository.save(application);
      
   
        return convertApplicationFromEntity(updatedApplication);
  }
	
	@Override
	public ApiResponse deleteApplication(Long applicantId, Long applicationId){
		JobApplicant applicant=jobApplicantRepository.findById(applicantId)
		                                 .orElseThrow(()->new ResourceNotFoundException(APPLICANT,ID,applicantId));
	    JobApplication application=jobApplicationRepository.findById(applicationId)
		                                 .orElseThrow(()->new ResourceNotFoundException(APPLICATION,ID,applicationId));
	    applicant.removeApplication(application);
		jobApplicantRepository.save(applicant);
		jobApplicationRepository.save(application);
		
		return new ApiResponse(Boolean.TRUE,"Job Application successfully deleted");
	}
	
	@Override
	public JobApplicationResponse getApplication(Long applicantId, Long applicationId){
		JobApplicant applicant=jobApplicantRepository.findById(applicantId)
		                                 .orElseThrow(()->new ResourceNotFoundException(APPLICANT,ID,applicantId));
	    Optional<JobApplication> application=applicant.getApplications().stream()
		                                    .filter(a-> a.getId() == applicationId)
											.findAny();
	    if(!application.isPresent()) throw new ResourceNotFoundException(APPLICATION,ID,applicationId);

		//else
	   return convertApplicationFromEntity(application.get());
	}
	
	private JobApplicant convertFromDTO(JobApplicantRegisterRequest request){
		JobApplicant applicant=modelMapper.map(request,JobApplicant.class);
		return applicant;
	}
	
	private JobApplicantResponse convertFromEntity(JobApplicant applicant){
		JobApplicantResponse jobResponse=modelMapper.map(applicant,JobApplicantResponse.class);
		return jobResponse;
	}
	
	private JobApplicationResponse convertApplicationFromEntity(JobApplication application){
		JobApplicationResponse response =new JobApplicationResponse();
		
		response.setId(application.getId());
		response.setApplicationDate(application.getApplicationDate());
		response.setJobName(application.getJob().getName());
		response.setJobId(application.getJob().getId());
		response.setJobStatus(application.getJob().getStatus().name());
		response.setApplicantId(application.getApplicant().getId());
		response.setApplicantFirstName(application.getApplicant().getFirstName());
		response.setApplicantLastName(application.getApplicant().getLastName());
		
		
		return response;
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
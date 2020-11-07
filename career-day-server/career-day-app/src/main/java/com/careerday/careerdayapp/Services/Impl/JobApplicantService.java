
@Service
public class JobApplicantService implements IJobApplicantService{
	
	private final JobApplicantRepository jobApplicationRepository;
	private final ModelMapper modelMapper;
	private final JobApplicationRepositry jobApplicationRepository;
	private final JobRepositry jobRepository;
	
	public static String ID="id";
	public static String EMAIL="email";
	public static String APPLICANT="Job Applicant";
	public static String APPLICATION="Job Application";
	
	

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
		                          orElseThrow(()-> ResourceNotFoundException(APPLICANT,ID,id));
		applicant.setFirstName(updatedApplicant.getFirstName());
		applicant.setLastName(updatedApplicant.getLastName());
		applicant.setLevelOfEducation(updatedApplicant.getLevelOfEducation());
		applicant.setYearsOfExperience(updatedApplicant.getYearsOfExperience());
		applicant.setPhone(updatedApplicant.getPhone());
		
		jobApplicantRepository.save(applicant);
		
		return convertFromEntity(applicant);
	}
	
	@Override
	public JobApplicantResponse getByEmail(String email){
		JobApplicant applicant=jobApplicantRepository.findByEmail(email)
		                       .orElseThrow(()-> new ResourceNotFoundException(APPLICANT,EMAIl,email));
	    return convertFromEntity(applicant);
	}

    @Override
    public JobApplicantRespone getById(Long id){
        JobApplicant applicant=jobApplicantRepository.findById(id)
                                 .orElseThrow(()-> new ResourceNotFoundException(APPLICANT, ID,id));
        return convertFromEntity(applicant);
    }
	
	@Override
	public PagedResponse<JobApplicantResponse> getAllApplicants(int page, int size){
		validatePageAndSize(page,size);
		Pageable pageable=Pageable.of(page,size, Sort.Direction.DESC, FIRST_NAME);
		
		Page<JobApplicant> applicants = jobApplicantRepository.findByAll(pageable);
		

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
		
		List<JobApplication> applications = applications.size() == 0 ? Collections.emptyList() : applications;
		List<JobApplicationResponse> response=applications.stream()
		                                                  .map(a->convertApplicationFromEntity(a))
														  .collect(Collectors.toList());
		
		return response;
		
	}
	
	@Override
	public JobApplicationResponse createApplication(Long applicantId,JobApplicationCreateRequest newApplication){
		JobApplicant applicant=jobApplicantRepository.findById(ApplicantId)
		                                 .orElseThrow(()->new ResourceNotFoundException(APPLICANT,ID,ApplicantId));
		Job job=jobRepository.findById(newApplication.getJobId())
		                                 .orElseThrow(()-> new ResourceNotFoundException(JOB,ID,newApplication.getJobId()));
		JobApplication newApplication = new JobApplication(job,applicant);
		JobApplication application=jobApplicationRepository.save(newApplication);
		applicant.addApplication(newApplication);
		jobApplicantRepository.save(applicant);
		
		return convertApplicationFromEntity(application);
	}

    @Override
    public JobApplicationResponse updateApplication(Long id, Long applicationId,JobApplicationUpdateRequest request){

        JobApplicant applicant=jobApplicantRepository.findById(ApplicantId)
		                                 .orElseThrow(()->new ResourceNotFoundException(APPLICANT,ID,applicantId));
	    JobApplication application=jobApplicationRepository.findById(applicationId)
                                       .orElseThrow(()->new ResourceNotFoundException(APPLICANT,ID,applicationId));

        application.setStatus(request.getStatus());
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
		JobApplicant applicant=modelMapper.map(JobApplicant,JobApplicationRegisterRequest.class);
		return applicant;
	}
	
	private JobApplicantResponse convertFromEntity(JobApplicant applicant){
		JobApplicantResponse jobResponse=modelMapper.map(JobApplicantResponse,JobApplicant.class);
		return jobResponse;
	}
	
	private JobApplicationResponse convertApplicationFromEntity(JobApplication application){
		JobApplicationResponse response =new JobApplicationResponse();
		
		response.setId(application.getId());
		response.setApplicationDate(application.getApplicationDate());
		response.setJobName(application.getJob().getName());
		response.setJobId(application.getJob().getId());
		response.setJobStatus(application.getJob().getStatus());
		response.setApplicantId(application.getApplicant().getId());
		response.setApplicationFirstName(application.getApplicant().getFirstName());
		response.setApplicantLastName(application.getApplicant().getLastName());
		response.setEmail(application.getApplicant().getEmail());
		
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
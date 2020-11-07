package com.careerday.careerdayapp.Services.Impl;


@Service
public class JobService implements IJobService{
	private final JobRepository jobRepository;
	private final JobTypeRepository jobTypeRepository;
	private final ModelMapper modelMapper;

    public static string JOB="Job";
	public static string ID="Id";
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
		                 .orElseThrow(()-> new ResourceNotFoundException(JOB,ID,id));
		 newJob.setType(jobType);
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
		job.setInterviewDate(LocalDate.of(updateRequest.getInterviewDate()))
		job.setStartTime(LocalTime.of(updateRequest.getStartTime()));
		job.setEndTime(LocalTime.of(updateRequest.getEndTime()));
		job.setStatus(new JobStatus(updateRequest.getStatus()));
		
		JobType jobType=jobTypeRepository.findByName(updateRequest.getJobType())
		                .orElseThrow(()-> new ResourceNotFoundException(JOB_TYPE,TYPE,updateRequest.getJobType()));
		job.setType(jobType);
		
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

		Page<Job> jobs = jobRepository.findByAll(pageable);

		List<Job> content = jobs.getNumberOfElements() == 0 ? Collections.emptyList() : jobs.getContent();

		return new PagedResponse<>(content, jobs.getNumber(), jobs.getSize(), jobs.getTotalElements(),
				jobs.getTotalPages(), jobs.isLast());
	}
	
	private Job convertFromDTO(JobCreateRequest jobDto){
		Job newJob=new Job();
		newJob.setName(jobDto.getName());
		newJob.setDescription(jobDto.getDescription());
		newJob.setSummary(jobDto.getSummary());
		newJob.setInterviewDate(LocalDate.of(jobDto.getInterviewDate()));
		newJob.setStartTime(LocalTime.of(jobDto.getStartTime());
		newJob.setEndTime(LocalTime.of(jobDto.getEndTime());
		newJob.setStatus(JobStatus.ACTIVE);
		
		return newJob;
	}
	
	
	
	private JobResponse convertFromEntity(Job job){
		JobResponse jobResponse=modelMapper.map(JobResponse,Job.class);
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
			throw new BadRequestException("Page size must not be greater than " +AppConstants. MAX_PAGE_SIZE);
		}
	}

	
}
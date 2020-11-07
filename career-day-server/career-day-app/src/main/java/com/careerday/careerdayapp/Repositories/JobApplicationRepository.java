package com.careerday.careerdayapp.Repositories;

import com.careerday.careerdayapp.Entities.JobApplication;

import javax.validation.constraints.NotNull;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    Page<JobApplication> getByApplicantId(@NotNull Long applicantId,Pageable pageable);
	Page<JobApplication> getByJob(@NotNull Long jobId, Pageable pageable);
}

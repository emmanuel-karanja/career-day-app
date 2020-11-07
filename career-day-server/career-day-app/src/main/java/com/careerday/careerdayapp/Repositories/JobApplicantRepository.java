package com.careerday.careerdayapp.Repositories;

import com.careerday.careerdayapp.Entities.JobApplicant;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JobApplicantRepository extends JpaRepository<JobApplicant, Long> {
	
	Optional<JobApplicant> findByEmail(@NotEmpty @NotBlank String email);
	Boolean existsByEmail (@NotBlank String email);
	Boolean existsByPhone (@NotBlank String phone);
}
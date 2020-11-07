package com.careerday.careerdayapp.Repositories;

import com.careerday.careerdayapp.Entities.JobApplicant;

import java.util.Optional;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JobApplicantRepository extends JpaRepository<JobApplicant, Long> {
	
	Optional<JobApplicant> findByEmail(@NotEmpty @Email String email);
	Boolean existsByEmail (@NotEmpty @Email String email);
	Boolean existsByPhone (@NotEmpty String phone);
}
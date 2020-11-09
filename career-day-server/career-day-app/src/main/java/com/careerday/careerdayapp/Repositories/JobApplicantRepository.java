package com.careerday.careerdayapp.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.careerday.careerdayapp.Entities.JobApplicant;

@Repository
public interface JobApplicantRepository extends JpaRepository<JobApplicant,Long>{
	Boolean existsByEmail(String email);
	Boolean existsByPhone(String phone);
	Optional<JobApplicant> findByPhone(String phone);
	Optional<JobApplicant> findByEmail(String email);
	
}
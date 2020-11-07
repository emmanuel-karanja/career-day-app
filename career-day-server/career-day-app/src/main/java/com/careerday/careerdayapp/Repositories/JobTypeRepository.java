package com.careerday.careerdayapp.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.careerday.careerdayapp.Entities.JobType;

import java.util.Optional;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotBlank;

public interface JobTypeRepository extends JpaRepository<JobType,Long>{
	Optional<JobType> findByName(@NotEmpty @NotBlank String name);	
}
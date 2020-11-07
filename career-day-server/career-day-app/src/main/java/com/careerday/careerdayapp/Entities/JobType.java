package com.careerday.careerdayapp.Entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.NaturalId;

import lombok.Data;

@Data
@Entity
@Table(name="job_types")
public class JobType{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="job_type_id")
	private Long id;

	@Enumerated(EnumType.STRING)
	@NaturalId
	@Column(name = "name")
	private JobTypeName name;

	public JobType(JobTypeName name) {
		this.name = name;
	}
}

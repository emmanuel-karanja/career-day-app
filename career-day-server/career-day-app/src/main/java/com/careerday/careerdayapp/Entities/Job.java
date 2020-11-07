package com.careerday.careerdayapp.Entities;

import java.time.LocalDate;
import java.time.LocalTime;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

@Setter
@Getter
@NoArgsConstructor
@Accessors(chain = true)
@Entity
@Table(name = "jobs",uniqueConstraints = { @UniqueConstraint(columnNames = { "interview_date" }) })
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "job_id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "summary")
    private String summary;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "job_type_id")
    private JobType jobType;

    @Enumerated(EnumType.STRING)
    @Column(name = "level_of_education")
    private LevelOfEducation levelOfEducation;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private JobStatus status;

    @Column(name = "interview_date",columnDefinition="DATE", unique=true)
    private LocalDate interviewDate;

    @Column(name = "start_time", columnDefinition="TIME")
    private LocalTime startTime;

    @Column(name = "end_time", columnDefinition = "TIME")
    private LocalTime endTime;
}
package com.careerday.careerdayapp.Entities;

public enum JobTypeName {
    API_ENGINEER, DATA_ENGINEER, UX_DESIGNER, UI_ENGINEER, DEVOPS_ENGINEER
}

@Data
@NoArgsConstructor
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

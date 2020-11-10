const JobApplicantRow=(props)=>{
    return(
             <tr onClick={onJobApplicantRowClicked}>
                <td><Link to={`/jobApplicantDetails/${props.applicant.applicantId}`}>
                {props.applicant.firstName}</Link></td>
				<td>{props.applicant.lastName}</td>
				<td>{props.applicant.email}</td>
				<td>{props.applicant.phone}</td>
				<td>{props.appicant.levelOfEducation}</td>
				<td>{props.job.yearsOfExperience}</td>
            </tr>
    )
}

const onJobApplicantRowClicked=(e)=>{
    //this will navigate away to the TaskDetails page.
    //this is where that nifty stuff about props.history stuff will come in.
    console.log(`Project ${e.target.value} selected via click`);
}

JobApplicantRow.propTypes={
    applicant: PropTypes.object.isRequired,
    deleteApplicant: PropTypes.func.isRequired,
};

const JobApplicantTable =(props)=>{
    const jobApplicantRows=props.applicant.map(applicant=> <JobApplicantRow key={applicant.applicantId}
                                                     applicant={applicant}
                                         deleteApplicant={props.deleteApplicant}/>)
    return(
        <div> <Table bordered hover responsive>
            <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
				<th>Phone</th>
                <th>Education</th>
                <th>Experience</th>  
                 				
            </tr>
            </thead>
            <tbody>{jobApplicantRows}</tbody>
        </Table>
        </div>
    )

}

JobTable.propTypes={
    jobs: PropTypes.array.isRequired,
    deleteJob:PropTypes.func.isRequired,
}

export default JobApplicantTable;

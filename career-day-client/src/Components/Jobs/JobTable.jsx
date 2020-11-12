import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Table,Button} from 'react-bootstrap';
const JobRow=(props)=>{
    function onDelete(){
        props.deleteJob(props.job.jobId);
    }
    return(
             <tr onClick={onJobRowClicked}>
                <td><Link to={`/jobDetails/${props.job.jobId}`}>
                {props.job.name}</Link></td>
				<td>{props.job.summary}</td>
				<td>{props.job.type}</td>
				<td>{props.job.levelOfEducation}</td>
				<td>{props.job.yearsOfExperience}</td>
				<td>{props.job.interviewDate.toLocaleDateString()}</td>
                <td>{props.job.status}</td>
                <td><Button variant="danger" type="button" onClick={onDelete}>Delete</Button></td>
            </tr>
    )
}

const onJobRowClicked=(e)=>{
    //this will navigate away to the TaskDetails page.
    //this is where that nifty stuff about props.history stuff will come in.
    console.log(`Project ${e.target.value} selected via click`);
}

JobRow.propTypes={
    job: PropTypes.object.isRequired,
    deleteJob: PropTypes.func.isRequired,
};

const JobTable =(props)=>{
    const jobRows=props.jobs.map(job=> <JobRow key={job.jobId}
                                                     job={job}
                                         deleteJob={props.deleteJob}/>)
    return(
        <div> <Table bordered hover responsive>
            <thead>
            <tr>
                <th>Name</th>
                <th>Summary</th>
                <th>Type</th>
                <th>Education</th>
                <th>Experience</th>  
                <th>Interview On</th>
                <th>Status</th>  				
            </tr>
            </thead>
            <tbody>{jobRows}</tbody>
        </Table>
        </div>
    )

}

JobTable.propTypes={
    jobs: PropTypes.array.isRequired,
    deleteJob:PropTypes.func.isRequired,
}

export default JobTable;

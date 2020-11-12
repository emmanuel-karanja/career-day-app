import React from 'react';
import {Button,Table} from 'react-bootstrap';
import{Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const JobApplicationRow=(props)=>{
    function onDelete(){
        props.deleteApplication(props.application.applicationId);
    }
    return(
             <tr onClick={onJobApplicationRowClicked}>
                <td><Link to={`/jobDetails/${props.application.jobId}`}>
                {props.job.name}</Link></td>
				<td>{props.application.jobName}</td>
				<td>{props.application.jobType}</td>
				<td>{props.application.jobSummary}</td>
                <td>{props.application.jobStatus}</td>
				<td>{props.application.applicationDate.toLocaleDateString()}</td>
				<td><Button variant="danger" type="button" onClick={onDelete}>Delete</Button></td>
                
            </tr>
    )
}


const onJobApplicationRowClicked=(e)=>{
    //this will navigate away to the TaskDetails page.
    //this is where that nifty stuff about props.history stuff will come in.
    console.log(`Application ${e.target.value} selected via click`);
}

JobApplicationRow.propTypes={
    application: PropTypes.object.isRequired,
    deleteApplication: PropTypes.func.isRequired,
};
const JobApplicationsTable =(props)=>{
    const jobApplicationRows=props.applications.map(application=> <JobApplicationRow key={application.applicationId}
                                                     application={application}
                                         deleteApplication={props.deleteApplication}/>)
    return(
        <div> <Table bordered hover responsive>
            <thead>
            <tr>
                <th>Job Name</th>  
                <th>Job Type</th>
                <th>Job Summary</th>
                <th>Job Status</th>
                <th>Applied On</th>				
            </tr>
            </thead>
            <tbody>{jobApplicationRows}</tbody>
        </Table>
        </div>
    )

}

JobApplicationsTable.propTypes={
    applications: PropTypes.array.isRequired,
    deleteApplication:PropTypes.func.isRequired,
}

export default JobApplicationsTable;

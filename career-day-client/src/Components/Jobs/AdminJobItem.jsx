import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

/*const JobStatuses=[
    'ACTIVE','SUSPENDED','CANCELLED','EXPIRED'
];*/

const AdminJobItem = props => {
  return (
    <div className="job-item">
      <div className="job-item-header">
        <div>
          <h3>{props.job.name}</h3>
        </div>
          Job Status:  {props.job.status}
      </div>
      <hr />
      <div className="job-body">
        <p>
          {props.job.description} <br/>	 	 
        </p>
		<strong>Interview On : {props.job.InterviewOn}</strong> <br/>
		 Interview StartTime : {props.job.StartTime} <br/>
		 Interview EndTime   : {props.job.EndTime}
      </div>
     <div>
        <Link to={`/updatejob/${props.job.jobId}`}>Edit</Link>  |  
        <Link to={`/jobdetails/${props.job.jobId}`}> Details</Link>
        <br/>
		<br/>
        <Button variant="danger" type="button" onClick={onDeleteJob}>Delete</Button>
		<hr/>
     </div>
    </div>
  );

 function onDeleteJob(){
	 props.deleteJob(props.job.jobId);
 }
  
};

export default AdminJobItem;

/*function mapStateToProps(state, ownProps) {
  return {
    job: state.jobs[ownProps.jobId],
  };
}

export connect(mapStateToProps)(AdminJobItem);*/






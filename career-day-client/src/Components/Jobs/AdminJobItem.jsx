import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

/*const JobStatuses=[
    'ACTIVE','SUSPENDED','CANCELLED','EXPIRED'
];*/

const AdminJobItem = props => {
	console.log(`jobId from adminjobItem: ${props.job.jobId}`);
  return (
    <div className="job-item">
      <div className="job-item-header">
        <div>
          {props.job.name}
        </div>
          {props.job.status}
      </div>
      <hr />
      <div className="job-body">
        <p>
          {props.job.summary}
        </p>
      </div>
     <div>
        <Link to={`/updatejob/${props.job.jobId}`}>Edit</Link>
        <br/>
        <Link to={`/jobdetails/${props.job.jobId}`}>Details</Link>
        <br/>
        <Button variant="danger" type="button" onClick={props.deleteJob}>Delete</Button>
     </div>
    </div>
  );

  
};

export default AdminJobItem;

/*function mapStateToProps(state, ownProps) {
  return {
    job: state.jobs[ownProps.jobId],
  };
}

export connect(mapStateToProps)(AdminJobItem);*/






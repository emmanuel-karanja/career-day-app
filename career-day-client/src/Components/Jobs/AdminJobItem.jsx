import React from 'react';
import { connect } from 'react-redux';

/*const JobStatuses=[
    'ACTIVE','SUSPENDED','CANCELLED','EXPIRED'
];*/

const AdminJobItem = props => {
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
          {props.job.description}
        </p>
      </div>
  <div>{/* we'll add an edit and delete button here to redirect to those pages*/}</div>
    </div>
  );

  
};

function mapStateToProps(state, ownProps) {
  return {
    job: state.jobs[ownProps.jobId],
  };
}

const connectedJobAdminItem= connect(mapStateToProps)(AdminJobItem);

export {connectedJobAdminItem as JobAdminItem};




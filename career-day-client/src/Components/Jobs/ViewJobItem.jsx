import React from 'react';
import { connect } from 'react-redux';

/*const JobStatuses=[
    'ACTIVE','SUSPENDED','CANCELLED','EXPIRED'
];*/

const ViewJobItem = props => {
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
    </div>
  );

  
};

function mapStateToProps(state, ownProps) {
  return {
    job: state.jobs[ownProps.jobId],
  };
}

const connectedJobItem= connect(mapStateToProps)(ViewJobItem);

export {connectedJobItem as ViewJobItem};

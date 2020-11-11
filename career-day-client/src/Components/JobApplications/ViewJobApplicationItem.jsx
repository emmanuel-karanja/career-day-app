import React from 'react';

/*const JobStatuses=[
    'ACTIVE','SUSPENDED','CANCELLED','EXPIRED'
];*/

const ViewJobApplicationItem = props => {
  return (
    <div className="job-item">
      <div className="job-item-header">
        <div>
          {props.application.jobName}
        </div>
          {props.application.status}
          {props.application.interviewDate}
      </div>
      <hr />
      <div className="job-body">
        <p>
          {props.applicant.jobSummary}
        </p>
      </div>
    </div>
  );

  
};

export default ViewJobApplicationItem;

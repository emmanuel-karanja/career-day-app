import React from 'react';

/*const JobStatuses=[
    'ACTIVE','SUSPENDED','CANCELLED','EXPIRED'
];*/

const ViewJobItem = props => {
  return (
    <div className="job-item">
      <div className="job-item-header">
        <div>
          <h3>{props.job.name}</h3>
        </div>
          Job Status: {props.job.status}
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
    </div>
  );

  
};

export default ViewJobItem;

import React from 'react';

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

export default ViewJobItem;

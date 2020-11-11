
import ViewJobItem from './ViewJobItem';
const ViewJobList=(props)=>{
    return (
        <div className="job-list">
          <div className="job-list-title">
            <strong>{props.job.status}</strong>
          </div>
          {props.jobs.map(job => (
            <ViewJobItem key={job.jobId} job={job} />
          ))}
        </div>
      );
}



export default ViewJobList;
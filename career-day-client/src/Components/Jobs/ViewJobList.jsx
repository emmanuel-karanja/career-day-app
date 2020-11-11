
import ViewJobItem from './ViewJobItem';
const ViewJobList=(props)=>{
	console.log(props);
    return (
        <div className="job-list">
          
          {props.jobs.map(job => (
            <ViewJobItem key={job.jobId} job={job} />
          ))}
        </div>
      );
}



export default ViewJobList;
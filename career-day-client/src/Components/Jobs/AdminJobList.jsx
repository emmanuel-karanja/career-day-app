
import AdminJobItem from './AdminJobItem';

const AdminJobList=(props)=>{
    return (
        <div className="job-list">
          <div className="job-list-title">
            <strong>Currently Posted Jobs</strong>
          </div>
          {props.jobs.map(job => (
            <AdminJobItem key={job.jobId} job={job} 
                          deleteJob={props.deleteJob} 
                          updateJob={props.updateJob}/>
          ))}
        </div>
      );
}



export default AdminJobList;
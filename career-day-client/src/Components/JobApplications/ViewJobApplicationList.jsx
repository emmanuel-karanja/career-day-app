
import ViewJobApplicationItem from './ViewJobApplicationItem';
const ViewJobApplicationList=(props)=>{
    return (
        <div className="job-list">
          <div className="job-list-title">
            <strong>{props.application.status}</strong>
          </div>
          {props.applications.map(application => (
            <ViewJobApplicationItem key={application.applicationId} application={application} />
          ))}
        </div>
      );
}



export default ViewJobApplicationList;
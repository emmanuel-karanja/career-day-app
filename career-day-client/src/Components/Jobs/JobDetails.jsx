
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {createApplication} from '../../modules/jobApplications';
import {Button} from 'react-bootstrap';
import Error from '../Common/Error';

const JobDetails=(props)=>{
	if (props.isLoading) {
        return <div className="jobs-loading">Loading...</div>;
      }
     if(props.error){
       return(<Error message={props.message}/>);
     }
    return(
        <div className="container">
		    Job Details
		 <div>
		     <h2>Job Name : {props.job.name}</h2>
			  <br/>
			   Job Type : {props.job.type}
			  <br/>
			  Job Status: {props.job.status}
			  <br/>
			  <strong>Interview On: {props.job.interviewOn} </strong>
			  <br/>
			  StartTime : {props.job.StartTime}
			  <br/>
			  EndTime : {props.job.EndTime}
			  <hr/>
			  <h3>Job Description</h3>
			  <hr/>
			  <p>{props.job.description}</p>
			  <hr/>
			  Level of Education : {props.job.levelOfEducation}
			  <hr/>		  
		 </div>
		 
		<Button variant="info" type="button" onClick={onApply}> Apply </Button>
	</div>
    );
	
	function onApply(){	
		const application={
			jobId: props.job.jobId,	
		}	
		props.createApplication(props.currentApplicant.applicantId,application);		
	}	
}

const mapStateToProps=(state)=>{
	const {isLoading,errors,message}=state.alerts;
	return{
		currentApplicant: state.currentApplicant,
		job : state.currentJob,
		isLoading,
		errors,
		message,
	}
}

const mapDispatchToProps=(dispatch)=> {
      return bindActionCreators(
        {
          createApplication
        },
        dispatch
      );
    }


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(JobDetails));
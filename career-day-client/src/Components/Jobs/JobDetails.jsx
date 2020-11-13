import React,{Component} from 'react';
import axios from 'axios';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {createApplication} from '../../modules/jobApplications';
import {Button} from 'react-bootstrap';
import Error from '../Common/Error';

class  JobDetails extends Component{

	constructor(){
		super();

		this.state={
			job:{},
			hasErrors:false,
			error:""
		};
	}
	

	onApply=()=>{
		const{jobId}=this.props;
		const {applicantId}=this.props.currentApplicant;		
		this.props.createApplication(applicantId,jobId);
	}

	render(){
	if (this.props.isLoading) {
        return <div className="jobs-loading">Loading...</div>;
      }
     if(this.state.hasErrors){
       return(<Error message={this.props.error}/>);
     }
    return(
        <div className="container">
		    Job Details
		 <div>
		     <h2>Job Name : {this.state.job.name}</h2>
			  <br/>
			   Job Type : {this.state.job.type}
			  <br/>
			  Job Status: {this.state.job.status}
			  <br/>
			  <strong>Interview On: {this.state.job.interviewOn} </strong>
			  <br/>
			  StartTime : {this.state.job.StartTime}
			  <br/>
			  EndTime : {this.state.job.EndTime}
			  <hr/>
			  <h3>Job Description</h3>
			  <hr/>
			  <p>{this.mapStateToProps.job.description}</p>
			  <hr/>
			  Level of Education : {this.state.job.levelOfEducation}
			  <hr/>		  
		 </div>
		 
		<Button variant="info" type="button" onClick={this.onApply}> Apply </Button>
	</div>
    );
	
	
  }
}

const mapStateToProps=(state)=>{
	const {isLoading,errors,message}=state.alerts;
	const {currentApplicant}=state.currentApplicant;
	return{
		currentApplicant,
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
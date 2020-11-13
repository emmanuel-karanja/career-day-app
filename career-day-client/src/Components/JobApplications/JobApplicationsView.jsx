//the top level component that interacts with the state container
//and acts as the container component for the applications
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {filterApplications, deleteApplication,fetchApplications} from '../../modules/jobApplications';
import JobApplicationsTable from './JobApplicationsTable';
import {jobApplicantApi} from '../../api/jobApplicantApi';
import {bindActionCreators} from 'redux';
import Error from '../Common/Error';
import {withRouter} from 'react-router-dom';
class JobApplicationsView extends Component{
    constructor(){
      super();
        this.state={applications:[],
                   hasErrors: false, 
                    errors:""};
      
    }

    async componentDidMount(){
      const {applicantId}=this.props.currentApplicant;
      this.props.fetchApplications(applicantId);
    }
    onSearch=(e)=>{
      this.props.filterApplications(e.target.value);
    }

    onDeleteApplication=(applicationId)=>{
       const {applicantId}=this.props.currentApplicant;
       this.props.deleteApplication(applicantId,applicationId);
    }
    render(){
        if (this.props.isLoading) {
            return <div className="jobs-loading">Loading...</div>;
          }
        
        if(this.state.hasErrors){
         return <Error message={this.state.errors}/>
        }else if(this.props.applications ===null || this.props.applications ===[] || this.props.applications==='undefined'){	
          return (<div>There are no applications to display</div>)			
		}
		else{
        return(
        <div>
            <div className="jobs">
              <div className="jobs-header">
                 <input onChange={this.onSearch} type="text" placeholder="Search..." />
              </div>
            </div>
            <h4>Job Applications</h4>
            <JobApplicationsTable applications={this.props.applications} 
               deleteApplication={this.onDeleteApplication}/>
        </div>
        );
        }
    }
}


const mapDispatchToProps=(dispatch)=> {
  return bindActionCreators(
    {
      deleteApplication,filterApplications,fetchApplications
    },
    dispatch
  );
}

const mapStateToProps=(state)=>{
	const{currentApplicant}=state.currentApplicant;
	const {applications}=state.applications;
	return{
		currentApplicant,
		applications,
	}
}
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps)
    (withRouter(JobApplicationsView));
//the top level component that interacts with the state container
//and acts as the container component for the applications
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {filterApplications, deleteApplication} from '../../modules/jobApplications';
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
      const {applicantId}=this.props.match.params;
      try{
        const response=await jobApplicantApi.fetchAllApplications(applicantId);
        if(!response.ok){
          throw new Error(response.statusText);
        }
        this.setState({applications:response.data});
      }catch(error){
        this.setState({hasErrors:true,errors: error.data});
      }
    }
    onSearch=(searchTerm)=>{
      this.props.filterApplications(searchTerm);
    }

    onDeleteApplication=(applicationId)=>{
       const {applicantId}=this.props.match.params;
       this.props.deleteApplication(applicantId,applicationId);
    }
    render(){
        if (this.props.isLoading) {
            return <div className="jobs-loading">Loading...</div>;
          }
        
        if(this.state.hasErrors){
         return <Error message={this.state.errors}/>
        }else{
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
      deleteApplication,filterApplications
    },
    dispatch
  );
}
  
  
  export default connect(
    null,
    mapDispatchToProps)
    (withRouter(JobApplicationsView));
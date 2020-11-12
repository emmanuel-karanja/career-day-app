import React,{Component} from 'react';
import JobApplicantTable from './JobApplicantTable';
import {withRouter} from 'react-router-dom';
import {deleteApplicant,fetchApplicants,getFilteredApplicants} from '../../modules/jobApplicants';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Error from '../Common/Error';

class ViewJobApplicantsPage extends Component{
    componentDidMount(){
        this.props.fetchApplicants();
    }

    onDeleteApplicant=(applicantId)=>{
        this.props.deleteApplicant(applicantId);
    }
    render(){
        if (this.props.isLoading) {
            return <div className="jobs-loading">Loading...</div>;
          }
         else if(this.props.error){
           return(<Error message={this.props.message}/>);
         }
         else{
        return(
            <div>
                <div className="jobs">
                  <div className="jobs-header">
                   <input onChange={this.onSearch} type="text" placeholder="Search..." />
                </div>
             </div>
            <h4>Job Applicants</h4>
                <JobApplicantTable applicants={this.props.applicants} 
                 deleteApplicant={this.onDeleteApplicant}/>
            </div>
        );
      }
    }
}

const mapStateToProps=(state)=>{
    const{isLoading,error,message}=state.alerts;
    
    return{
      applicants: getFilteredApplicants(state),
      isLoading,
      error,
      message,
    }
}

const mapDispatchToProps=(dispatch)=> {
    return bindActionCreators(
      {
        fetchApplicants,deleteApplicant
      },
      dispatch
    );
  }
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ViewJobApplicantsPage));
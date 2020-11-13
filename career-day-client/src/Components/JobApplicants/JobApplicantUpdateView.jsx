import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect} from "react-redux";
import {createApplicant} from "../../modules/jobApplicants";
import JobApplicantUpdateForm from './JobApplicantUpdateForm';
import {bindActionCreators} from 'redux';
import {jobApplicantApi} from '../../api/jobApplicantApi';
import Error from '../Common/Error';

class JobApplicantUpdateView extends Component {
  constructor(){
    super();
    this.state={
       applicant: {},
       error:"",
       hasErrors:false
    }
  }
  async componentDidMount(){
   const{applicantId}=this.props.match.params;
   try{
      const response=await jobApplicantApi.fetchApplicant(applicantId);
      if(!response.ok){
        throw new  Error(response.statusText);
      }
      this.setState({applicant: response.data})
   }catch(error){
     this.setState({hasErrors:true,error:error.data, applicant:{}});
   }
  }
  render() {
    if(this.state.hasErrors){
      return (
          <Error message={this.state.error}/>
      );
    }else{
    return (
      <div className="container">         
            <Link to="/"> Back to home</Link>
            <div style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Update Your Applicant Profile</b> below
              </h4>              
            </div>
            <JobApplicantUpdateForm updateApplicant={this.props.updateApplicant} applicant={this.state.applicant}/>
      </div>
    );
    }
  }
}

JobApplicantUpdateView.propTypes = {
  updateApplicant: PropTypes.func.isRequired,
};



const mapDispatchToProps=(dispatch)=> {
    return bindActionCreators(
      {
        createApplicant
      },
      dispatch
    );
  }

  
export default connect(
  null,
  mapDispatchToProps
)(withRouter(JobApplicantUpdateView));

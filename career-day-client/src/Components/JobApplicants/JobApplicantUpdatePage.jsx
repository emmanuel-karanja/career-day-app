import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect} from "react-redux";
import {createApplicant,fetchApplicant} from "../../modules/jobApplicants";
import JobApplicantUpdateForm from './JobApplicantUpdateForm';
import {bindActionCreators} from 'redux';

class JobApplicantUpdatePage extends Component {
  constructor(){
    super();
    this.state={
       job: null,
    }
  }
  componentDidMount(){
	 const {applicantId}=this.props.match.params;
     this.props.fetchApplicant(applicantId);
  }
  render() {

    return (
      <div className="container">         
            <Link to="/"> Back to home</Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Update Your Applicant Profile</b> below
              </h4>              
            </div>
            <JobApplicantUpdateForm updateApplicant={this.props.updateApplicant} applicant={this.state.applicant}/>
      </div>
    );
  }
}

JobApplicantUpdatePage.propTypes = {
  updateApplicant: PropTypes.func.isRequired,
  applicant : PropTypes.object.isRequired
};



const mapDispatchToProps=(dispatch)=> {
    return bindActionCreators(
      {
        createApplicant,fetchApplicant
      },
      dispatch
    );
  }

  const mapStateToProps=(state)=>{
    return{
       applicant: state.currentApplicant,
    }
  }
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(JobApplicantUpdatePage));

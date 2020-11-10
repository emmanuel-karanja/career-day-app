import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect} from "react-redux";
import {createApplicant,fetchJob} from "../../modules/jobApplicants";
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
     const  {jobId}=this.props.match.params;
     const currentApplicant=this.props.fetchApplicant(jobId);
     this.setState({job: currentApplicant});
  }
  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect"> Back to home</Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Update Your Applicant Profile</b> below
              </h4>
              
            </div>
            <JobApplicantUpdateForm updateApplicant={this.props.updateApplicant} applicant={this.state.applicant}/>
          </div>
        </div>
      </div>
    );
  }
}

JobApplicantUpdatePage.propTypes = {
  updateApplicant: PropTypes.func.isRequired,
};



const mapDispatchToProps=(dispatch)=> {
    return bindActionCreators(
      {
        createApplicant,fetchApplicant
      },
      dispatch
    );
  }

export default connect(
  null,
  mapDispatchToProps
)(withRouter(JobApplicantUpdatePage));

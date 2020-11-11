import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect} from "react-redux";
import {createApplicant} from "../../modules/jobApplicants";
import JobApplicantCreateForm from './JobApplicantCreateForm';
import {bindActionCreators} from 'redux';
import {login} from "../../modules/auth";



class JobApplicantRegisterPage extends Component {
  
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.authentication.isLoggedIn) {
      this.props.history.push("/viewjoblist");
    }
  }


  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect"> Back to home</Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register As New Applicant</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <JobApplicantCreateForm createApplicant={this.props.createApplicant}/>
          </div>
        </div>
      </div>
    );
  }
}

JobApplicantRegisterPage.propTypes = {
  login: PropTypes.func.isRequired,
  createApplicant: PropTypes.func.isRequired,
  authentication: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
	
	return {
		authentication: state.authentication
	}
}

const mapDispatchToProps=(dispatch)=> {
    return bindActionCreators(
      {
        createApplicant,login
      },
      dispatch
    );
  }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(JobApplicantRegisterPage));

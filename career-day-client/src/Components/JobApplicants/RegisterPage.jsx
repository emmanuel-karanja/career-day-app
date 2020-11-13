import React, { Component } from "react";
import {withRouter,Link} from "react-router-dom";
import PropTypes from "prop-types";
import { connect} from "react-redux";
import {createApplicant} from "../../modules/jobApplicants";
import JobApplicantCreateForm from './JobApplicantCreateForm';
import {bindActionCreators} from 'redux';
import Error from '../Common/Error';

class RegisterPage extends Component {
  onRegister=(newApplicant)=>{
    this.props.createApplicant(newApplicant);
    const{history}=this.props;
    if(this.props.error !==""){
        history.push('/register-success');
    }
  
  }

  render() {
    if(this.props.error ===""){
      return(<Error message={this.props.message}/>);
    }
    else{
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
            <JobApplicantCreateForm createApplicant={this.onRegister}/>
          </div>
        </div>
      </div>
    );
    }
  }
}
RegisterPage.propTypes = {
  login: PropTypes.func.isRequired,
  createApplicant: PropTypes.func.isRequired,
  authentication: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const {appLoaded}=state.appLoaded;
  const {error,message, isLoading}=state.alerts;
	return {
    appLoaded,
    error,
    message,
    isLoading
	}
}

const mapDispatchToProps=(dispatch)=> {
    return bindActionCreators(
      {
        createApplicant
      },
      dispatch
    );
  }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RegisterPage));

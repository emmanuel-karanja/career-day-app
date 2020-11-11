
import React,{Component} from 'react';
import PropTypes from "prop-types";
import { connect} from "react-redux";
import JobUpdateForm from './JobUpdateForm';
import {bindActionCreators} from 'redux';
import {createJob} from '../../modules/jobs';
import {withRouter} from 'react-router-dom';

 class JobUpdatePage extends Component{
    render(){
        return(
            <div>
                <JobUpdateForm job={this.props.job} updateJob={this.props.updateJob}/>
            </div>
        );
    }
}

JobUpdatePage.propTypes = {
    updateJob: PropTypes.func.isRequired,
    job: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = state => (
      {
       job: state.currentJob,
    });
  
  const mapDispatchToProps=(dispatch)=> {
      return bindActionCreators(
        {
          createJob
        },
        dispatch
      );
    }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(JobUpdatePage));
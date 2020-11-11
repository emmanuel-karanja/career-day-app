
import React,{Component} from 'react';
import PropTypes from "prop-types";
import { connect} from "react-redux";
import JobUpdateForm from './JobUpdateForm';
import {bindActionCreators} from 'redux';
import {updateJob,fetchJob,deleteJob,getJobById} from '../../modules/jobs';
import {withRouter} from 'react-router-dom';

 class JobUpdatePage extends Component{
	componentDidMount(){
		const {jobId}=this.props.match.params;
		console.log(`jobid from jobupdate page : ${jobId}`);
		this.props.fetchJob(jobId);
	}
    render(){
        return(
            <div>
                <JobUpdateForm job={this.props.job} 
				                   updateJob={this.props.updateJob}
								   deleteJob={this.props.deleteJob}/>
            </div>
        );
    }
}

JobUpdatePage.propTypes = {
    updateJob: PropTypes.func.isRequired,
	deleteJob: PropTypes.func.isRequired,
    job: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => (
      //const {jobId}=ownProps.match.params; 
      	  
        {
           job: state.currentJob
        }
	);
  
  const mapDispatchToProps=(dispatch)=> {
      return bindActionCreators(
        {
          fetchJob,updateJob,deleteJob
        },
        dispatch
      );
    }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(JobUpdatePage));
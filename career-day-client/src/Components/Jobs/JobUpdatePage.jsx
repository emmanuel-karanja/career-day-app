
import React,{Component} from 'react';
import PropTypes from "prop-types";
import { connect} from "react-redux";
import JobUpdateForm from './JobUpdateForm';
import {bindActionCreators} from 'redux';
import {updateJob,fetchJob,deleteJob,getJobById} from '../../modules/jobs';
import {withRouter} from 'react-router-dom';
import {jobApi} from '../../API/JobApi';



 class JobUpdatePage extends Component{
   	 
   componentDidMount(){
	   const {jobId}=this.props.match.params;
	   this.props.fetchJob(jobId);
	   
   }
   
   render(){ 
        
			
		//console.log(this.props);
        return(
            <div>
               <JobUpdateForm job={this.props.job} updatejob={this.props.updateJob}/>
            </div>
        ); 
   }
}

JobUpdatePage.propTypes={
	job: PropTypes.object.isRequired,
	updateJob: PropTypes.func.isRequired,
	fetchJob: PropTypes.func.isRequired,
}
  
 const mapStateToProps= (state,ownProps)=>{
      const {jobId}=ownProps.match.params; 
       return {
	       job : state.currentJob
        }
 }
  
  const mapDispatchToProps=(dispatch)=> {
      return bindActionCreators(
        {
          fetchJob,updateJob
        },
        dispatch
      );
    }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(JobUpdatePage));
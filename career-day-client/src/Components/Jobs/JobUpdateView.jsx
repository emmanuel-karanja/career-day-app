
import React,{Component} from 'react';
import PropTypes from "prop-types";
import { connect} from "react-redux";
import JobUpdateForm from './JobUpdateForm';
import {bindActionCreators} from 'redux';
import {updateJob} from '../../modules/jobs';
import {withRouter} from 'react-router-dom';
import {jobApi} from '../../api/jobApi';
import Error from '../Common/Error';
import axios from 'axios';
 class JobUpdateView extends Component{
   	 constructor(){
        super();
        this.state={job:{}, error:"",hasErrors:false};
      }
   async componentDidMount(){
     const {jobId}=this.props;;
     axios.get(`http://localhost:8080/api/v1/jobs/${jobId}`)
        .then(response => {
			this.setState({ job: response.data});    
	   	}).catch(error => {
            this.setState({ errorMessage: error.message, hasErrors:true});         
        });
	   
   }
   
   render(){        
		 if(this.state.hasErrors){
         return( <Error message={this.state.error}/>)
      }
       else{ return(
            <div>
               <JobUpdateForm job={this.state.job} updatejob={this.props.updateJob}/>
            </div>
        ); 
       }
   }
}

JobUpdateView.propTypes={
	updateJob: PropTypes.func.isRequired,
}
  
  
  const mapDispatchToProps=(dispatch)=> {
      return bindActionCreators(
        {
          updateJob
        },
        dispatch
      );
    }

    
  
  export default connect(
    null,
    mapDispatchToProps
  )(withRouter(JobUpdateView));
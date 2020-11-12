
import React,{Component} from 'react';
import PropTypes from "prop-types";
import { connect} from "react-redux";
import JobUpdateForm from './JobUpdateForm';
import {bindActionCreators} from 'redux';
import {updateJob} from '../../modules/jobs';
import {withRouter} from 'react-router-dom';
import {jobApi} from '../../API/JobApi';
import Error from '../Common/Error';



 class JobUpdatePage extends Component{
   	 constructor(){
        super();
        this.state={job:{}, error:"",hasErrors:false};
      }
   async componentDidMount(){
	   const {jobId}=this.props.match.params;
	   try{
       const response=await jobApi.fetchJobById(jobId);
       if (!response.ok) {
        throw Error(response.statusText);
      }
      this.setState({job:response.data});
     }catch(error){
       this.setState({error:error.data,hasErrors:true});
     }
	   
   }
   
   render(){ 
        
			if(this.state.hasErrors){
          //display error
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

JobUpdatePage.propTypes={
	updateJob: PropTypes.func.isRequired,
	fetchJob: PropTypes.func.isRequired,
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
  )(withRouter(JobUpdatePage));
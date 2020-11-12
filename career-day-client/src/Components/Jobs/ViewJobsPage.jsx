//the top level component that interacts with the state container
//and acts as the container component for the jobs view

import React,{Component} from 'react';
import ViewJobList from './ViewJobList';
import {connect} from 'react-redux';
import {filterJobs, getFilteredJobs,getJobs,fetchJobs} from '../../modules/jobs';
import PropType from 'prop-types';
import {bindActionCreators} from 'redux';
import Error from '../Common/Error';

class ViewJobsPage extends Component{
	
	componentDidMount(){
		this.props.fetchJobs();
	}

  onSearch=(searchTerm)=>{
      this.props.filterJobs(searchTerm);
  }
  render(){
     if (this.props.isLoading) {
            return <div className="jobs-loading">Loading...</div>;
      }
          //else
      if(this.props.errors){
        return (<Error message={this.props.message}/>);
      }else{
        return(
        <div>
            <div className="jobs">
              <div className="jobs-header">
                 <input onChange={this.onSearch} type="text" placeholder="Search..." />
              </div>
            </div>
            <ViewJobList jobs={this.props.jobs}/>
        </div>
        );
      }
    }
}

ViewJobsPage.propTypes={
  jobs: PropType.array.isRequired,
  filterJobs: PropType.func.isRequired,
  fetchJobs: PropType.func.isRequired
}

const mapDispatchToProps=(dispatch)=> {
      return bindActionCreators(
        {
          filterJobs,fetchJobs
        },
        dispatch
      );
    }
function mapStateToProps(state) {
    const{isLoading,errors,message}=state.alerts;
    return {
      jobs : getJobs(state),
      isLoading,
      errors,
      message,
    };
  }
  
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(ViewJobsPage);
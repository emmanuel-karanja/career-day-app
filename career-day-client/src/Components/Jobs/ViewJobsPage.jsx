//the top level component that interacts with the state container
//and acts as the container component for the jobs view

import React,{Component} from 'react';
import ViewJobList from './ViewJobList';
import {connect} from 'react-redux';
import {filterJobs, getFilteredJobs} from '../../modules/jobs';

class ViewJobsPage extends Component{

    onSearch=(searchTerm)=>{
      this.props.filterJobs(searchTerm);
    }
    render(){
        if (this.props.isLoading) {
            return <div className="jobs-loading">Loading...</div>;
          }
          //else
        return(
        <div>
            <div className="jobs">
              <div className="jobs-header">
                 <input onChange={this.onSearch} type="text" placeholder="Search..." />
              </div>
            </div>
            <ViewJobList jobs={this.props.jobs}/>
        </div>
        )
    }
}

function mapStateToProps(state) {
    const{isLoading}=state.alerts;
    return {
      jobs : getFilteredJobs(state),
      isLoading
    };
  }
  
  
  
  export default connect(mapStateToProps,{filterJobs})(ViewJobsPage);
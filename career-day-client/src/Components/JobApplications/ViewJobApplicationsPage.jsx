//the top level component that interacts with the state container
//and acts as the container component for the jobs view

import React,{Component} from 'react';
import ViewJobList from './ViewJobList';
import {connect} from 'react-redux';
import {filterApplications, getFilteredApplications} from '../../modules/jobApplications';
import ViewJobApplicationList from './ViewJobApplicationList';
class ViewJobApplicationsPage extends Component{

    onSearch=(searchTerm)=>{
      this.props.filterApplications(searchTerm);
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
            <h4>Job Applications</h4>
            <ViewJobApplicationList applications={this.props.applications}/>
        </div>
        )
    }
}

function mapStateToProps(state) {
    const{isLoading}=state.alerts;
    return {
      applications : getFilteredApplications(state),
      isLoading
    };
  }
  
  
  
  export default connect(mapStateToProps,{filterApplications})(ViewJobApplicationsPage);
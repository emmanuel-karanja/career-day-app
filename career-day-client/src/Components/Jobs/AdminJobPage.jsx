import React,{Component} from 'react'
import {createJob,updateJob,deleteJob, getFilteredJobs} from '../../modules/jobs';
import JobCreateForm from './JobCreateForm';
import {connect} from 'react-redux';
import AdminJobList from './AdminJobList';
import {bindActionCreators} from 'redux';



class AdminJobsPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        showNewJobCardForm: false,
      };
    }
  
    toggleForm = () => {
      this.setState({ showNewJobCardForm: !this.state.showNewJobCardForm });
    }
    onSearch=(searchTerm)=>{
      this.props.filterJobs(searchTerm);
    }
    renderJobLists() { 
        return (
          <AdminJobList
            jobs={this.props.jobs}
            createJob={this.props.createJob}
            updatedJob={this.props.updateJob}
            deleteJobb={this.props.deleteJob}
          />
        );
    
    }
  
    render() {
     if (this.props.isLoading) {
        return <div className="jobs-loading">Loading...</div>;
      }
  
      return (
        <div className="jobs">
          <div className="jobs-header">
            <input onChange={this.onSearch} type="text" placeholder="Search..." />
            <button className="button button-default" onClick={this.toggleForm}>
              + New Job
            </button>
          </div>
          {this.state.showNewJobCardForm && <JobCreateForm createJob={this.props.createJob}/> } 
          <div className="job-lists">{this.renderJobLists()}</div>
        </div>
      );
    }
  }
  
  function mapStateToProps(state) {
    const { isLoading } = state.alerts;
  
    return {
      jobs : getFilteredJobs(state),
      isLoading,
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(
      {
        createJob, updateJob,deleteJob
      },
      dispatch
    );
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(AdminJobsPage);
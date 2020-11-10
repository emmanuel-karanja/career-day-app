import React,{Component} from 'react'
import {createJob,updateJob,deleteJob} from '../../modules/jobs';
import JobCreateForm from './JobCreateForm';
import {connect,bindActionCreators} from 'react-redux';
import AdminJobList from './AdminJobList';



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
          {this.state.showNewJobCardForm && JobCreateForm} 
          <div className="job-lists">{this.renderTaskLists()}</div>
        </div>
      );
    }
  }
  
  function mapStateToProps(state) {
    const { isLoading } = state.alert;
  
    return {
      jobs : state.jobs,
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
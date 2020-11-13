//the top level component that interacts with the state container
//and acts as the container component for the jobs view

import React,{Component} from 'react';
import ViewJobList from './ViewJobList';
import {connect} from 'react-redux';
import {filterJobs, getFilteredJobs,fetchJobs} from '../../modules/jobs';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import Error from '../Common/Error';

class JobsView extends Component{
	componentDidMount(){
		this.props.fetchJobs();
	}

  onSearch=(e)=>{
      this.props.filterJobs(e.target.value);
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

JobsView.propTypes={
  jobs: PropTypes.array.isRequired,
  filterJobs: PropTypes.func.isRequired,
  fetchJobs: PropTypes.func.isRequired
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
    const{isLoading,error,message}=state.alerts;
    return {
      jobs : getFilteredJobs(state),
      isLoading,
      error,
      message,
    };
  }
  
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(JobsView);
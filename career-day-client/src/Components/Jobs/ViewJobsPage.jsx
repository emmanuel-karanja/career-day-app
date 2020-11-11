//the top level component that interacts with the state container
//and acts as the container component for the jobs view

import React,{Component} from 'react';
import ViewJobList from './ViewJobList';
import {connect} from 'react-redux';
import {filterJobs, getFilteredJobs,getJobs,fetchJobs} from '../../modules/jobs';
import PropType from 'prop-types';
import {bindActionCreators} from 'redux';

class ViewJobsPage extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		console.log(this.props);
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
          console.log(this.props.jobs);
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
    const{isLoading}=state.alerts;
    return {
      jobs : getJobs(state),
      isLoading
    };
  }
  
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(ViewJobsPage);
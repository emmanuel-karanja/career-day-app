
import React, { Component } from 'react';
import ViewJobPage from '../../../Jobs/ViewJobsPage';
import './style.css';
import {withRouter} from 'react-router-dom';
import {fetchJobs} from '../../../../modules/jobs';
import {connect} from 'react-redux';



class Home extends Component {
  componentDidMount(){
     this.props.fetchJobs()
  }
  render() {
    return (
      <div className="Container">
         <h2>Home</h2>
        <hr/>
        <ViewJobPage/>
      </div>
    );
  }
}





export default connect(null,{fetchJobs})(withRouter(Home));
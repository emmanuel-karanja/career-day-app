
import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {onLoadHome} from '../modules/appCommon';
import {connect} from 'react-redux';
import JobsView from './Jobs/JobsView';


class Home extends Component {
  componentDidMount(){
    console.log('on home loading..');
    this.props.onLoadHome()
  }
  render() {
    console.log('in home');
    return (
      <div className="Container">
         <h2>List of Jobs</h2>
        <hr/>
        <JobsView/>
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  const {appLoaded}=state.appLoaded;
  const{isLoading, error,message}=state.alerts;

  return{
    appLoaded,
    isLoading,
    error,
    message,
  }
}


export default connect(mapStateToProps,{onLoadHome})(withRouter(Home));
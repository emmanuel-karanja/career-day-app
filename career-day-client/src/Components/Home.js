
import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {onLoadHome} from '../modules/appCommon';
import {connect} from 'react-redux';
import JobsView from './Jobs/JobsView';
import Error from '../Components/Common/Error';

class Home extends Component {
  componentDidMount(){
    this.props.onLoadHome()
  }
  render() {
    return (
      
      <div className="Container">
         <h2>List of Jobs</h2>
        <hr/>
        {(this.props.error !=="") ? <Error message={this.props.message}/> : null}
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
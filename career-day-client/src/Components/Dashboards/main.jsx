
import React,{Component} from 'react';
import authApi from '../../API/AuthApi';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import {fetchJobs} from '../../modules/jobs';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

const currentUser=authApi.getCurrentUser();

class Main extends Component{
   componentDidMount(){
       this.props.fetchJobs();
   }
    render(){
        return(<div> { currentUser.isAdmin ? <AdminDashboard/> : <UserDashboard/>}</div>)
    }
}






export default connect(
    null,
    {fetchJobs}
  )(withRouter(Main));
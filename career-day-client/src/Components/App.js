import React,{Component} from 'react';
import {connect} from 'react-redux';
import {onLoad,onLoadHome} from '../modules/appCommon';
import {withRouter,Route,Switch} from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import LoginPage from './Login/LoginPage';
import LogoutPage from './Logout/LogoutPage';
import AdminJobsView from './Jobs/AdminJobsView';
import RegisterPage from './JobApplicants/RegisterPage';
import JobsView from './Jobs/JobsView';
import JobDetails from './Jobs/JobDetails';
import JobApplicantsView from './JobApplicants/JobApplicantsView';
import { PrivateRoute } from './Common/PrivateRoute';
import JobApplicationsView from './JobApplications/JobApplicationsView';
import authApi from '../api/authApi';
import JobApplicantUpdateView from './JobApplicants/JobApplicantUpdateView';
import RegistrationSuccess from './JobApplicants/RegistrationSuccess';
import JobUpdateView from './Jobs/JobUpdateView';
import NotFound from './NotFound';

class App extends Component{
  
  componentDidMount(){
    const user=authApi.getCurrentUser();
    console.log('in app..')
	console.log(user);
    if(user){
        this.props.onLoad(user);
    }
   // this.props.onLoadHome();
  } 
  render() {
      return (
        <div>
          <Header
            appName="careerday"
            currentUser={this.props.currentUser} />
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/login" component={LoginPage} />
              <Route path="/view-jobs" component={JobsView}/>
              <Route path="/register" component={RegisterPage}/>
			  <Route path="/register-success" component={RegistrationSuccess}/>
              <PrivateRoute path="/update-my-profile" component={JobApplicantUpdateView}/>
              <Route path="/admin-jobs" component={AdminJobsView}/>
              <Route path="/job-details/:jobId" component={JobDetails}/>
              <Route path="/view-applicants" component={JobApplicantsView}/>
              <Route path="/view-applications" component={JobApplicationsView}/>
              <Route path="/job-update/:jobId" component={JobUpdateView}/>
              <Route path="/logout" component={LogoutPage}/>
              <Route component={NotFound}/>    
            </Switch>
        </div>
      );
    
    
  }
}

const mapStateToProps=(state)=>{
  const {appLoaded}=state.appLoaded;
  const {currentUser}=state.currentUser;
  return{
    appLoaded,
    currentUser,
  }
}
export default connect(mapStateToProps,{onLoad,onLoadHome}) (withRouter(App));
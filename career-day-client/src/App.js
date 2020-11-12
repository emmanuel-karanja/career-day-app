
import './App.css';
import Header from './Components/Common/Layout/Header/Header';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Route } from 'react-router';
import {connect} from 'react-redux';
import Home from './Components/Common/Layout/Home';
import NotFound from './Components/Common/Layout/NotFound';



import {Provider} from 'react-redux';
import store from './store/store';
import AdminJobPage from './Components/Jobs/AdminJobPage';
import JobApplicantRegistrationPage from './Components/JobApplicants/JobApplicantRegistrationPage';
import JobApplicantUpdatePage from './Components/JobApplicants/JobApplicantUpdatePage';
import RegistrationSuccess from './Components/JobApplicants/RegistrationSuccess';
import ViewJobList from './Components/Jobs/ViewJobList';
import JobDetailsPage from './Components/Jobs/JobDetailsPage'
import JobUpdatePage from './Components/Jobs/JobUpdatePage';
import LoginPage from './Components/Login/LoginPage';
import JobApplicantDetailsPage from './Components/JobApplicants/JobApplicantDetailsPage';
import ViewJobApplicationsPage from './Components/JobApplications/ViewJobApplicationsPage';
import authApi from './API/AuthApi';
import ViewJobApplicantsPage from './Components/JobApplicants/ViewJobApplicantsPage';
import LogoutPage from './Components/Logout/LogoutPage';
import Main  from './Components/Dashboards/main';

let App=(props)=> {
  return (
   <Provider store={store}>
    <BrowserRouter>
        <div>
          <Header appName={props.appName} currentUser={props.currentUser}/>
          
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/main" component={Main}/>
              <Route path="/login" component={LoginPage}/>
              <Route path="/logout" component={LogoutPage}/>
              <Route path="/registerapplicant" component={JobApplicantRegistrationPage}/>
              <Route path="/applicants" component={ViewJobApplicantsPage}/>
              <Route path="/adminjobpage" component={AdminJobPage}/>
              <Route path="/viewjoblist" component={ViewJobList}/>
              <Route path="/jobdetails/:jobId" component={JobDetailsPage}/>
			        <Route path="/updatejob/:jobId" component={JobUpdatePage}/>    
              <Route path="/registrationsuccess" component={RegistrationSuccess}/>
              <Route path="/updateapplicant/:applicantId" component={JobApplicantUpdatePage}/>
              <Route path="/applicantdetails/:applicantId" component={JobApplicantDetailsPage}/>
              <Route path="/applicationspage/:applicantId" component={ViewJobApplicationsPage}/>
              <Route component={NotFound} />
            </Switch>
          </div>         
        </div>
      </BrowserRouter>
     </Provider>
  );
}


const mapStateToProps=(state)=>{
  
   const currentUser=state.authentication.user;
   return{
      appName: 'CAREERDAY',
      currentUser
   }
}

App = connect(mapStateToProps)(App);

const AppWithStore = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};


export default AppWithStore;

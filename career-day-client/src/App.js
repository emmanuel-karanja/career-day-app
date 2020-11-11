import logo from './logo.svg';
import './App.css';
import Header from './Components/Common/Layout/Header/Header';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Route } from 'react-router';

import Home from './Components/Common/Layout/Home';
import About from './Components/Common/Layout/About';
import Contact from './Components/Common/Layout/Contact';
import NotFound from './Components/Common/Layout/NotFound';
import Footer from './Components/Common/Layout/Footer';
import AdminHeader from './Dashboards/AdminDashboard';


import {Provider} from 'react-redux';
import store from './store/store';
import AdminJobPage from './Components/Jobs/AdminJobPage';
import JobApplicantRegistrationPage from './Components/JobApplicants/JobApplicantRegistrationPage';
import JobApplicantUpdatePage from './Components/JobApplicants/JobApplicantUpdatePage';
import ViewJobList from './Components/Jobs/ViewJobList';
import JobDetailsPage from './Components/Jobs/JobDetailsPage'
import JobUpdatePage from './Components/Jobs/JobUpdatePage';
import LoginPage from './Dashboards/LoginPage';
import JobApplicantDetailsPage from './Components/JobApplicants/JobApplicantDetailsPage';
import ViewJobApplicationsPage from './Components/JobApplications/ViewJobApplicationsPage';

function App() {
  return (
   <Provider store={store}>
    <BrowserRouter>
        <div>
          <AdminHeader/>
          
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/login" component={LoginPage}/>
              <Route path="/adminjobpage" component={AdminJobPage} />
              <Route path="/viewjoblist" component={ViewJobList}/>
              <Route path="/jobdetails/:jobId" component={JobDetailsPage}/>
			  <Route path="/updatejob/:jobId" component={JobUpdatePage}/>
              <Route path="/registerapplicant" component={JobApplicantRegistrationPage}/>
              <Route path="/updateapplican/:applicantId" component={JobApplicantUpdatePage}/>
              <Route path="/applicantdetails/:applicantId" component={JobApplicantDetailsPage}/>
              <Route path="/applicationspage/:applicantId" component={ViewJobApplicationsPage}/>
              <Route path="/contact" component={Contact} />
              <Route component={NotFound} />
            </Switch>
          </div>
          
          <Footer/>
        </div>
      </BrowserRouter>
     </Provider>
  );
}

export default App;

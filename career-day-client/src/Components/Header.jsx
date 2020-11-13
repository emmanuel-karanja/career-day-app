import React from 'react';
import { Link } from 'react-router-dom';
import LiNavLink from './LiNavLink';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';


const LoggedOutView = props => {
  console.log('loggedoutview');
  if (!props.currentUser) {
    return (      
      <div role="navigation" className="navbar navbar-expand-lg">
        <div className="container">
            <ul className="navbar-nav mr-auto">
              <LiNavLink activeClassName='active' exact={true} to="/">Home</LiNavLink>
              <LiNavLink activeClassName='active'  to="/login">Sign-in</LiNavLink>
              <LiNavLink activeClassName='active'  to="/register">Sign-Up</LiNavLink>         
            </ul>
          </div>
        </div>
    );
  }
  return null;
};

const LoggedInView = props => {
	console.log(props);
	//console.log(props.currentUser.admin);
  if (props.currentUser  && props.currentUser.admin===false) {
    return (
      <div role="navigation" className="navbar navbar-expand-lg">
        <div className="container">
            <ul className="navbar-nav mr-auto">
              <LiNavLink activeClassName='active' exact={true} to="/">Home</LiNavLink>
              <LiNavLink activeClassName='active' exact={true} to='/view-applications'>My Applications</LiNavLink>
              <LiNavLink activeClassName='active' exact={true} to="/update-my-profile">My Profile</LiNavLink> 
              <LiNavLink activeClassName='active' exact={true} to="/logout">Sign-out</LiNavLink> 
              <LiNavLink activeClassName='active' to={`/@${props.currentUser.username}`}
                         className="nav-link"> {props.currentUser.username}
              </LiNavLink>
             </ul>
          </div>
        </div>
    );
  }

  return null;
};

const AdminLoggedInView = props => {
  if (props.currentUser && props.currentUser.admin===true) {
    return (
      <div role="navigation" className="navbar navbar-expand-lg">
        <div className="container">
            <ul className="navbar-nav mr-auto">
              <LiNavLink activeClassName='active' exact={true} to="/">Home</LiNavLink>
              <LiNavLink activeClassName='active' exact={true} to="/admin-jobs">Jobs</LiNavLink>
              <LiNavLink activeClassName='active' exact={true} to="#">Applicants</LiNavLink>
              <LiNavLink activeClassName='active' to='#'>{props.currentUser.email}</LiNavLink>
              <LiNavLink activeClassName='active' exact={true} to="/logout">Sign-out</LiNavLink>             
             </ul>
          </div>
        </div>
    );
  }

  return null;
};

//will evaluate a condition to determine if the currenty logged in user
//is an admin or not.
const Header =(props)=> {
    return (
      <nav className="navbar navbar-light">
        <div className="container">
          <Link to="/" className="navbar-brand">
            {props.appName.toLowerCase}
          </Link>
           <LoggedOutView currentUser={props.currentUser} />
           <LoggedInView currentUser={props.currentUser} applicant={props.currentApplicant}/>
           <AdminLoggedInView currentUser={props.currentUser} applicant={props.currentApplicant}/>
        </div>
      </nav>
    );
}

const mapStateToProps=(state)=>{
	const {currentUser}=state.currentUser;
	
	return{
	   currentUser
	}
}

export default connect(mapStateToProps)(withRouter(Header));

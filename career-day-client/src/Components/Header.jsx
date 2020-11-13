import React from 'react';
import { Link } from 'react-router-dom';
import LiNavLink from './LiNavLink';


const LoggedOutView = props => {
  console.log('loggedoutview');
  if (!props.currentUser) {
    return (      
      <div role="navigation" className="navbar navbar-expand-lg">
        <div className="container">
            <ul className="navbar-nav mr-auto">
               <li className="nav-item">
                  <Link to="/" className="nav-link">Home</Link>
              </li>
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
  if (props.currentUser  && props.currentUser.isAdmin===false) {
    return (
      <div role="navigation" className="navbar navbar-expand-lg">
        <div className="container">
            <ul className="navbar-nav mr-auto">
               <li className="nav-item">
                  <Link to="/" className="nav-link">Home</Link>
              </li>

              <LiNavLink activeClassName='active' exact={true} to={`/view-applications/${props.currentUser.userId}`}>My Applications</LiNavLink>
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
              <LiNavLink activeClassName='active' exact={true} to="/view-jobs">Jobs</LiNavLink>
              <LiNavLink activeClassName='active' exact={true} to="/view-applicants">Applicants</LiNavLink>
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
           <LoggedInView currentUser={props.currentUser}/>
           <AdminLoggedInView current={props.currentUser}/>
        </div>
      </nav>
    );
}

export default Header;

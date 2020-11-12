import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LiNavLink from '../LiNavLink/LiNavLink';

import './style.css';

const LoggedOutView = props => {
  if (!props.currentUser && (props.admin===true)) {
    return (      
      <div role="navigation" className="navbar navbar-expand-lg">
        <div className="container">
            <ul className="navbar-nav mr-auto">
              <LiNavLink activeClassName='active' exact={true} to="/">Home</LiNavLink>
              <LiNavLink activeClassName='active' exact={true} to="/login">Sign-in</LiNavLink>
              <LiNavLink activeClassName='active' exact={true} to="/registerapplicant">Sign-Up</LiNavLink>         
            </ul>
          </div>
        </div>
    );
  }
  return null;
};

const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <div role="navigation" className="navbar navbar-expand-lg">
        <div className="container">
            <ul className="navbar-nav mr-auto">
              <LiNavLink activeClassName='active' exact={true} to="/">Home</LiNavLink>
              <LiNavLink activeClassName='active' exact={true} to={`/applicationspage/${props.currentUser.userId}`}>Jobs</LiNavLink>
              <LiNavLink activeClassName='active' exact={true} to="/profile">My Profile</LiNavLink> 
              <LiNavLink activeClassName='active' exact={true} to="/logout">Sign-out</LiNavLink> 
              <LiNavLink activeClassName='active' to={`/@${props.currentUser.username}`}
                     className="nav-link">
                    <img src={props.currentUser.image} className="user-pic" alt={props.currentUser.username} />
                  {props.currentUser.username}
              </LiNavLink>
             </ul>
          </div>
        </div>
    );
  }

  return null;
};

export const AdminLoggedInView = props => {
  if (!props.currentUser && props.admin===true) {
    return (
      <div role="navigation" className="navbar navbar-expand-lg">
        <div className="container">
            <ul className="navbar-nav mr-auto">
              <LiNavLink activeClassName='active' exact={true} to="/">Home</LiNavLink>
              <LiNavLink activeClassName='active' exact={true} to="/adminjobpage">Jobs</LiNavLink>
              <LiNavLink activeClassName='active' exact={true} to="/profile">My Profile</LiNavLink> 
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
class Header extends React.Component {
  render() {
    console.log(this.props.currentUser);
    return (
      <nav className="navbar navbar-light">
        <div className="container">
          <Link to="/" className="navbar-brand">
            {this.props.appName.toLowerCase}
          </Link>
          <LoggedOutView currentUser={this.props.currentUser} />
          <LoggedInView currentUser={this.props.currentUser} admin={this.props.admin}/>
          <AdminLoggedInView current={this.props.currentUser} admin={this.props.admin}/>
        </div>
      </nav>
    );
  }
}

export default Header;

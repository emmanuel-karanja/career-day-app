import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LiNavLink from '../Components/Common/Layout/LiNavLink/LiNavLink';

import './style.css';

class AdminHeader extends Component {
  render() {
    return (
      <div role="navigation" className="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">CareerDay Admin-Dashboard</a>
        <div className="container">
            <ul className="navbar-nav mr-auto">
              <LiNavLink activeClassName='active' exact={true} to="/jobs">Jobs</LiNavLink>
              <LiNavLink activeClassName='active' exact={true} to="/jobApplicants">Job Applicants</LiNavLink>
              <LiNavLink activeClassName='active' exact={true} to="/jobApplications">Job Applications</LiNavLink>
              <LiNavLink activeClassName='active' exact={true} to="/">Home</LiNavLink>
              <LiNavLink activeClassName='active' exact={true} to="/about">About</LiNavLink>
              <LiNavLink activeClassName='active' exact={true} to="/contact">Contact</LiNavLink>              
            </ul>          
        </div>
      </div>
    )
  }
}

export default AdminHeader;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LiNavLink from '../LiNavLink/LiNavLink';

import './style.css';

class Header extends Component {
  render() {
    return (

          <div role="navigation" className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">CareerDay App</a>
        <div className="container">
            <ul className="navbar-nav mr-auto">
              <LiNavLink activeClassName='active' exact={true} to="/">Home</LiNavLink>
              <LiNavLink activeClassName='active' exact={true} to="/login">Log-in</LiNavLink>
              <LiNavLink activeClassName='active' exact={true} to="/registerapplicant">Register</LiNavLink>
              <LiNavLink activeClassName='active' exact={true} to="/about">About</LiNavLink>
              <LiNavLink activeClassName='active' exact={true} to="/contact">Contact</LiNavLink>
            </ul>
          </div>
        </div>
      
    )
  }
}

export default Header;
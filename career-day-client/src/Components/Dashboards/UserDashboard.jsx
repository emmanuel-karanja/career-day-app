import React from 'react';
import ViewJobPage from '../Jobs/ViewJobsPage';
import authApi from '../../API/AuthApi';
import LiNavLink from '../Common/Layout/LiNavLink/LiNavLink';

const UserNavbar = props => {
      
      return (
        <div role="navigation" className="navbar navbar-expand-lg">
          <div className="container">
              <ul className="navbar-nav mr-auto">
                <LiNavLink activeClassName='active' exact={true} to="/">Home</LiNavLink>
                <LiNavLink activeClassName='active' exact={true} to={`/applicationspage/${props.currentUser.userId}`}>Job Applications</LiNavLink>
                <LiNavLink activeClassName='active' exact={true} to="/updateapplicant">My Profile</LiNavLink> 
                <LiNavLink activeClassName='active' exact={true} to="/logout">Sign-out</LiNavLink> 
                <LiNavLink activeClassName='active' to={`/@${props.currentUser.firstName}`}
                           className="nav-link"> {props.currentUser.email}
                </LiNavLink>
               </ul>
            </div>
          </div>
      );
    }

    const UserDashboard=(props)=>{
        const currentUser=authApi.getCurrentUser();
        return(
        <div>
            <UserNavbar currentUser={currentUser} />
            <hr/>
            
        </div>
        );
    }

export default UserDashboard;
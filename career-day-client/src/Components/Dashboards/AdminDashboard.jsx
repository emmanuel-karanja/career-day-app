import React from 'react';
import ViewJobPage from '../Jobs/AdminJobPage';
import LiNavLink from '../Common/Layout/LiNavLink/LiNavLink';


const AdminNavbar = props => {
    return (
      <div role="navigation" className="navbar navbar-expand-lg">
        <div className="container">
            <ul className="navbar-nav mr-auto">
              <LiNavLink activeClassName='active' exact={true} to="/">Home</LiNavLink>
              <LiNavLink activeClassName='active' exact={true} to="/adminjobpage">Jobs</LiNavLink>
              <LiNavLink activeClassName='active' exact={true} to="/applicants">Applicants</LiNavLink> 
              <LiNavLink activeClassName='active' exact={true} to="/logout">Sign-out</LiNavLink>             
             </ul>
          </div>
        </div>
    );
  }
  
 const AdminDashboard=(props)=>{

     return(
       <div>
       <AdminNavbar/>
       <ViewJobPage/>
       </div>
     );
 }

 export default AdminDashboard;
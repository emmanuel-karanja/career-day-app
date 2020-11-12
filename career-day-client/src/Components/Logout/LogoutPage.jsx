import React from 'react';
import {Link} from 'react-router-dom';
import {logout} from '../../modules/auth';
import {connect} from 'react-redux';

const LogoutPage=(props)=>{
    props.logout();
    return(
        <div>
            <h3>You have logged out</h3>
            <Link to="/">Back to home</Link>
        </div>
    )
}


 
  
    export default connect(
      null,
      {logout}
    )(LogoutPage);

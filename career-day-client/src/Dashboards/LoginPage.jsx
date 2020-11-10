
import React,{Component} from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../Components/Login/LoginForm';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {login} from '../modules/auth';
class LoginPage extends Component{
   render(){
       return(
           <div>
               <LoginForm login={this.props.login}/>
           </div>
       )
   }
}

LoginPage.propType={
    login: PropTypes.func.isRequired,
}

const mapDispatchToProps=(dispatch)=> {
    return bindActionCreators(
      {
        login,
      },
      dispatch
    );
  }

  export default connect(
    null,
    mapDispatchToProps
  )(LoginPage);
  


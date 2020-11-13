
import React,{Component} from 'react';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {login,loginSuccess} from '../../modules/auth';
import {withRouter} from 'react-router-dom';
import Error from '../Common/Error';
import axios from 'axios';
import {onLoad} from '../../modules/appCommon';


const LOGIN_URL='http://localhost:8080/api/v1/auth/login';

class LoginPage extends Component{
    constructor(){
		super();
		this.state={errorMessage:"",
		            hasErrors:false,
		            user:{}
				   };
	}
	
	onLogin=(credentials)=>{	
		axios.post(LOGIN_URL, credentials)
        .then(response => {
			this.setState({ user: response.data});
			const {history}=this.props;
			this.props.onLoad(response.data);     
			history.push('/');
		}).catch(error => {
            this.setState({ errorMessage: error.message, hasErrors:true});         
        });
	}
	render(){
       console.log('inside login');
       return(
           <div>
		   {this.state.hasErrors? <Error message={this.state.errorMessage}/> : null}
               <LoginForm login={this.onLogin}/>
           </div>
       ); 
	}
}

LoginPage.propType={
    login: PropTypes.func.isRequired,
}


const mapDispatchToProps=(dispatch)=> {
    return bindActionCreators(
      {
        login,loginSuccess,onLoad
      },
      dispatch
    );
  }

  export default connect(
    null,
    mapDispatchToProps
  )(withRouter(LoginPage));
  


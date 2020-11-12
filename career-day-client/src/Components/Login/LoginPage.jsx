
import React,{Component} from 'react';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {login} from '../../modules/auth';
import {withRouter} from 'react-router-dom';
import Error from '../Common/Error';

class LoginPage extends Component{
   render(){
    if (this.props.isLoading) {
      return <div className="jobs-loading">Loading...</div>;
    }
    
    if(this.props.error){
      return(<Error message={this.props.message}/>)
    }
    else{
       return(
           <div>
               <LoginForm login={this.props.login}/>
           </div>
       );
    }
   }
}

LoginPage.propType={
    login: PropTypes.func.isRequired,
}

const mapStateToProps=state=>{
  const{isLoading,error,message}=state.alerts;
  return{
    isLoading, error,message
  }
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
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(LoginPage));
  


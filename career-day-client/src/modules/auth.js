
import history from '../Utils/history';
import authApi from '../API/AuthApi';
import {setCurrentApplicant} from './jobApplicants';
import {alertActions} from './alerts';

export const AuthConstants = {
    LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
    LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',
    
    LOGOUT: 'USERS_LOGOUT',
};


export default function authReducer(authentication = {}, action) {
    switch (action.type) {
        case AuthConstants.LOGIN_REQUEST:
          return {
            loggingIn: true,
            user: action.payload
          };

        case AuthConstants.LOGIN_SUCCESS:
          return {
            loggedIn: true,
            user: action.payload
          };
        case AuthConstants.LOGIN_FAILURE:
          return {};
        case AuthConstants.LOGOUT:
          return {};
        default:
          return authentication
      }
}


export const login=(credentials)=>{
  const{email}=credentials;
  return async dispatch=>{
    dispatch(requestLogin(email));
    dispatch(alertActions.clear());
    try{
      //to get data from from axios you response.data
      const {data}=await authApi.login(credentials);
      dispatch(setCurrentApplicant(data));
      dispatch(loginSuccess(data));
      dispatch(alertActions.success(`User ${data.firstName} fetched successfuly`));
      history.push('/');
    }catch(error){
     dispatch(alertActions.failure('Failed to fetch Applicant',error.message));
     dispatch(loginFailure('Failed to fetch user',error.message));
    }
  }
}


export const logout=()=> {
    authApi.logout();
    return {
         type: AuthConstants.LOGOUT 
        };
}

const requestLogin=(user)=>{ 
    return { 
         type: AuthConstants.LOGIN_REQUEST, 
         payload: user 
     } 
}

const loginSuccess=(user)=> {
     return{
           type: AuthConstants.LOGIN_SUCCESS, 
           payload:user 
      } 
}
const loginFailure=(error)=> {
     return {
          type: AuthConstants.LOGIN_FAILURE, 
          payload: error 
        } 
}
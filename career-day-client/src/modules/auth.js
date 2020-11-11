
import history from '../Utils/history';
import authApi from '../API/AuthApi';
import {alertActions} from './alerts';
import {ApplicantConstants,setCurrentApplicant} from './jobApplicants';

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
            user: action.user
          };
        case AuthConstants.LOGIN_SUCCESS:
          return {
            loggedIn: true,
            user: action.user
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
    dispatch(requestLogin(email))
    try{
      const data=await authApi.login(credentials);
      dispatch(setCurrentApplicant(data));
      dispatch(loginSuccess(`Applicant ${data.firstName} fetched successfuly`));
      history.push('/');
    }catch(error){
     dispatch(loginFailure('Failed to fetch Applicant',error.message));
    }
  }
}


const logout=()=> {
    authApi.logout();
    return {
         type: AuthConstants.LOGOUT 
        };
}

function requestLogin(user) { 
    return { 
         type: AuthConstants.LOGIN_REQUEST, 
         payload: user 
     } 
}

function loginSuccess(user) {
     return{
           type: AuthConstants.LOGIN_SUCCESS, 
           payload:user 
      } 
    }
function loginFailure(error) {
     return {
          type: AuthConstants.LOGIN_FAILURE, 
          payload: error 
        } 
    }
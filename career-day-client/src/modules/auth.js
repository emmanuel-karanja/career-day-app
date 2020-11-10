
import history from '../Utils/history';
import authApi from '../API/AuthApi';
import {alertActions} from './alerts';

export const userConstants = {
    LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
    LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',
    
    LOGOUT: 'USERS_LOGOUT',

    GETALL_REQUEST: 'USERS_GETALL_REQUEST',
    GETALL_SUCCESS: 'USERS_GETALL_SUCCESS',
    GETALL_FAILURE: 'USERS_GETALL_FAILURE',
};


export default function authReducer(authentication = {}, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
          return {
            loggingIn: true,
            user: action.user
          };
        case userConstants.LOGIN_SUCCESS:
          return {
            loggedIn: true,
            user: action.user
          };
        case userConstants.LOGIN_FAILURE:
          return {};
        case userConstants.LOGOUT:
          return {};
        default:
          return authentication
      }
}


export const authActions = {
    login,
    logout,
};

export function login(credentials) {
    const {email}=credentials;
    return dispatch => {
        dispatch(request({ email }));

        authApi.login(credentials)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    
}

function logout() {
    authApi.logout();
    return {
         type: userConstants.LOGOUT 
        };
}

function request(user) { 
    return { 
         type: userConstants.LOGIN_REQUEST, 
         payload: user 
     } 
}

function success(user) {
     return{
           type: userConstants.LOGIN_SUCCESS, 
           payload:user 
      } 
    }
function failure(error) {
     return {
          type: userConstants.LOGIN_FAILURE, 
          payload: error 
        } 
    }
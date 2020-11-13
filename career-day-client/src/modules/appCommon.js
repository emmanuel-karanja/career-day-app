

import {fetchJobs} from './jobs';
import {loginSuccess} from './auth'
import {fetchApplications} from './jobApplications';
import {fetchApplicants,fetchApplicant} from './jobApplicants';

const AppConstants={
    APP_LOADED_EVENT : 'APP_LOADED_EVENT',
}

export default function appCommonReducer(appLoaded=false,action){
    switch(action.type){
        case AppConstants.APP_LOADED_EVENT:{
            return true;
        }

        default:{
            return appLoaded;
        }
    }
}

export const onLoad=(user)=>{
    //load the user as the current user
  return async dispatch=>{
    if(user){
         dispatch(loginSuccess(user));
         console.log('current user loaded into state..');
    }
    dispatch(fetchJobs());
    console.log('jobs loaded into state..');

    if(user.id){
        dispatch(fetchApplications(user.id));
		dispatch(fetchApplicant(user.email));
        console.log('applications loaded into state..');
    }
    if(user.admin===true){
        dispatch(fetchApplicants(user.id));
        console.log('applicants loaded into state..');
    }

    dispatch(isLoaded());
    console.log('app state initialized..');
}

}

export const onLoadHome=()=>{
    console.log('onload home..')
  return async dispatch=>{ 
    dispatch(fetchJobs());
    dispatch(isLoaded());
}

}
const isLoaded=()=>{
    console.log('on loaded called')
    return{
        type: AppConstants.APP_LOADED_EVENT,
        payload:true
    }
}
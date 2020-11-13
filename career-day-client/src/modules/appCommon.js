

import {fetchJobs} from './jobs';
import {loginSuccess} from './auth'
import {fetchApplications} from './jobApplications';
import {fetchApplicants} from './jobApplicants';

const AppConstants={
    APP_LOADED_EVENT : 'APP_LOADED_EVENT',
}

export default function appCommonReducer(appLoaded= false,action){
    switch(action){
        case AppConstants.ADD_LOADED_EVENT:{
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
  return async dispatch=>{ 
    dispatch(fetchJobs());
}

}
const isLoaded=()=>{
    return{
        type: AppConstants.APP_LOADED_EVENT,
    }
}
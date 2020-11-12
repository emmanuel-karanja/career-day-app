//import {projectActions} from './projects';
import {alertActions}  from './alerts';
import { jobApplicantApi } from '../API/JobApplicantApi';
import { createSelector } from 'reselect';

export const ApplicationConstants={
   FETCH_APPLICATIONS_SUCCEEDED: 'FETCH_APPLICATIONS_SUCCEEDED',
   CREATE_APPLICATION_SUCCEEDED: 'CREATE_APPLICATION_SUCCEEDED',
   UPDATE_APPLICATION_SUCCEEDED: 'UPDATE_APPLICATION_SUCCEEDED',
   DELETE_APPLICATION_SUCCEEDED: 'DELETE_APPLICATION_SUCCEEDED',
   FILTER_APPLICATIONS:'FILTER_APPLICATIONS',

   
};


export default function applicationsReducer(applications=[],action){
    switch(action.type){
      case ApplicationConstants.FETCH_APPLICATIONS_SUCCEEDED :{
        return  action.payload;
      }
  
      case ApplicationConstants.CREATE_APPLICATION_SUCCEEDED:{
         return  applications.concat(action.payload);
      }
  
      case ApplicationConstants.EDIT_APPLICANT_SUCCEEDED:{
        const nextApplications=applications.map(applicant=>{
          if(applicant.applicantId===action.payload){
              Object.assign({},applicant,action.payload);
          }
          return applications;
        });
        return nextApplications;
      }
  
      case ApplicationConstants.DELETE_APPLICATION_SUCCEEDED:{
        const nextApplications=applications.filter(application=>application.applicationId !== action.payload);
        return  nextApplications;
      }
  
      default:{
        return applications;
      }
    }
  }
  


export const fetchApplications=(id)=>{
  return  async (dispatch)=>{
    dispatch(alertActions.clear());
    try{ 
      const {data}=await jobApplicantApi.fetchAllApplications(id);
      dispatch(fetchApplicationsSucceeded(data));
      dispatch(alertActions.success('Applications fetched successfully'))
    }catch(error){
      dispatch(alertActions.failure('Failed to fetch Applications',error.message));
    }
  }
}

 export const fetchApplicationsSucceeded=(applications)=>{
   return{
     type: ApplicationConstants.FETCH_APPLICATIONS_SUCCEEDED,
     payload:applications
   }
 }


 export const createApplication=(id,newApplication)=>{
   return async (dispatch,getState)=>{
     dispatch(alertActions.clear());
     try{
       const {data}=await jobApplicantApi.createApplication(id,newApplication);
       dispatch(createApplicationSucceeded(data));
       dispatch(alertActions.success('Application Created Succesfully'));
     }catch(error){
      dispatch(alertActions.failure('Failed to createApplication',error));
     }
   }
 }

  const createApplicationSucceeded=(application)=>{
    return{
      type: ApplicationConstants.CREATE_APPLICATION_SUCCEEDED,
      payload:application,
    }
  }

 export const updateApplication=(id,application)=>{
   return async (dispatch,getState)=>{
     dispatch(alertActions.clear())
     try{
        const data=await jobApplicantApi.updateApplication(id,application);
        dispatch(updateApplicationSucceeded(data));
        
        dispatch(alertActions.success('Application Updated'));
     }catch(error){
       dispatch(alertActions.failure('Failed to update Application',error.message));
     }
   }
 }

const updateApplicationSucceeded=(application)=>{
    return{
        type: ApplicationConstants.UPDATE_APPLICATION_SUCCEEDED,
        payload:application
    }
}

 export const deleteApplication=(applicantId,applicationId)=>{
   return async (dispatch,getState)=>{
     dispatch(alertActions.clear());
     try{
       await jobApplicantApi.deleteApplication(applicantId,applicationId)
       dispatch(deleteApplicationSucceeded(applicationId));
       dispatch(alertActions.success('Application Deleted'));
     }catch(error){
       dispatch(alertActions.failure('Failed to delete Application',error.message));
     }
   }
 }

 const deleteApplicationSucceeded=(id)=>{
   return {
     type: ApplicationConstants.DELETE_APPLICATION_SUCCEEDED,
     payload:id
   };
 }

export const filterApplications=(searchTerm)=>{
  return {
    type: ApplicationConstants.FILTER_APPLICATIONS,
    payload: searchTerm,
  }

}

/// ----SELECTORS---//

export const getApplications=(state)=>{
    const applicantId=state.currentApplicant.applicantId;
    if (!applicantId) {
      return [];
    }
    const selected= state.applications.filter(application=> application.applicationId===applicantId);
    return selected;
  }
  
  const getSearchTerm=(state,applicantId)=>state.searchTerm;
  
  export const getFilteredApplications=createSelector(
    [getApplications,getSearchTerm],
    (applications,searchTerm)=>{
      return applications.filter(application=>{
        const match =application.firstName.match(new RegExp(searchTerm,'i')) ||
                     application.lastName(new RegExp(searchTerm,'i'));
        return match;
      });
    }
  );

  

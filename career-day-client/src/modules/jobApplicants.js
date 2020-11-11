
import {alertActions} from './alerts';
import {jobApplicantApi} from '../API/JobApplicantApi';
import {createSelector} from 'reselect';

export const ApplicantConstants={
   FETCH_APPLICANTS_SUCCEEDED: 'FETCH_APPLICANTS_SUCCEEDED',
   CREATE_APPLICANT_SUCCEEDED: 'CREATE_APPLICANT_SUCCEEDED',
   EDIT_APPLICANT_SUCCEEDED: 'EDIT_APPLICANT_SUCCEEDED',
   DELETE_APPLICANT_SUCCEEDED: 'DELETE_APPLICANT_SUCCEEDED',

   FILTER_APPLICANTS: 'FILTER_APPLICANTS',
   SET_CURRENT_APPLICANT: 'SET_CURRENT_APPLICANT'

};

export const ApplicationStatusConstants={
  ACTIE: 'Active',
  SUSPENDED:'Suspended',
  CANCELLED: 'Cancelled',
  EXPIRED: 'Expired'
};



export default function applicantsReducer(applicants=[],action){
  switch(action.type){
    case ApplicantConstants.FETCH_APPLICANTS_SUCCEEDED :{
      return  action.payload;
    }

    case ApplicantConstants.CREATE_APPLICANT_SUCCEEDED:{
       return  applicants.concat(action.payload);
    }

    case ApplicantConstants.EDIT_APPLICANT_SUCCEEDED:{
      const nextApplicants=applicants.map(applicant=>{
        if(applicant.applicantId===action.payload.id){
            Object.assign({},applicant,action.payload);
        }
        return applicant;
      });
      return nextApplicants;
    }

    case ApplicantConstants.DELETE_APPLICANT_SUCCEEDED:{
      const nextApplicants=applicants.filter(applicant=>applicant.applicantId !== action.payload);
      return  nextApplicants;
    }

    default:{
      return applicants;
    }
  }
}


/*Action Creators */


export const fetchApplicants=()=>{
  return  async (dispatch)=>{
    dispatch(alertActions.clear());
    try{
      const data=await jobApplicantApi.fetchAllApplicants();
    dispatch(fetchApplicantsSucceeded(data));
        const defaultApplicantId=data[0].applicantId;
        dispatch(fetchApplicant(defaultApplicantId));
      dispatch(alertActions.success('Applicants fetched successfully'))
    }catch(error){
      dispatch(alertActions.failure('Failed to fetch Applicants',error.message));
    }
  }
}

 const fetchApplicantsSucceeded=(applicants)=>{
   return{
     type: ApplicantConstants.FETCH_APPLICANTS_SUCCEEDED,
     payload:applicants
   }
 }


 export const createApplicant=(newApplicant)=>{
   //const newApplicant={title,description,status};
   return async dispatch=>{
     dispatch(alertActions.clear())
     try{
       const {data}=await jobApplicantApi.createApplicant(newApplicant);
       dispatch(createApplicantSucceeded(data));
       dispatch(alertActions.success('Applicant Created Succesfully'));
       dispatch(fetchApplicant(data.applicantId));
     }catch(error){
      dispatch(alertActions.failure('Failed to createApplicant',error.message));
     }
   }
 }

 const createApplicantSucceeded=(newApplicant)=>{
   return{
     type: ApplicantConstants.CREATE_APPLICANT_SUCCEEDED,
     payload: newApplicant,
   };
 }

 export const updateApplicant=(applicant)=>{
   return async dispatch=>{
     dispatch(alertActions.clear())
     try{
        const data=await jobApplicantApi.editApplicant(applicant);
        dispatch(editApplicantSucceeded(data));
        dispatch(alertActions.success('Applicant Updated'));
        dispatch(fetchApplicant(data.applicantId));
     }catch(error){
       dispatch(alertActions.failure('Failed to update Applicant',error.message));
     }
   }
 }

 const editApplicantSucceeded=(updatedApplicant)=>{
   return{
     type:ApplicantConstants.EDIT_APPLICANT_SUCCEEDED,
     payload: updatedApplicant
   }
 }

 export const deleteApplicant=(id)=>{
   return async dispatch=>{
     dispatch(alertActions.clear());
     try{
       await jobApplicantApi.deleteApplicant(id)
       dispatch(deleteApplicantSucceeded(id));
       dispatch(alertActions.success('Applicant Deleted'));
     }catch(error){
       dispatch(alertActions.failure('Failed to delete Applicant',error.message));
     }
   }
 }

 const deleteApplicantSucceeded=(id)=>{
   return {
     type: ApplicantConstants.DELETE_APPLICANT_SUCCEEDED,
     payload:id
   };
 }


export const fetchApplicant=(id)=>{
  return async dispatch=>{
    try{
      const data=await jobApplicantApi.getApplicantById(id);
      dispatch(setCurrentApplicant(data));
      dispatch(alertActions.success(`Applicant ${data.firstName} fetched successfuly`))
    }catch(error){
     dispatch(alertActions.failure('Failed to fetch Applicant',error.message));
    }
  }
}

export const setCurrentApplicant=(applicant)=>{
  return {
    type: ApplicantConstants.SET_CURRENT_APPLICANT,
    payload: applicant
  }
}

export const filterApplicants=(searchTerm)=>{
  return {
    type: ApplicantConstants.FILTER_APPLICANTS,
    payload: searchTerm,
  }

}


///-----SELECTORS-----//

export const getApplicants=(state)=>{
  return state.applicants;
}

const getSearchTerm=(state)=>state.searchTerm;

export const getFilteredApplicants=createSelector(
  [getApplicants,getSearchTerm],
  (applicants,searchTerm)=>{
    return applicants.filter(applicant=>{
      const match =applicant.firstName.match(new RegExp(searchTerm,'i')) ||
                   applicant.lastName(new RegExp(searchTerm,'i')) ||
                   applicant.levelOfEducation(new RegExp(searchTerm,'i'));
      return match;
    });
  }
);




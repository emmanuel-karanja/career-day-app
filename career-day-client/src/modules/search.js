import {JobConstants} from './jobs';
import {ApplicationConstants} from './jobApplications';
import {ApplicantConstants}  from './jobApplicants';


export default function searchReducer(searchTerm='', action){
  switch(action.type){
    case JobConstants.FILTER_JOBS:{
      return action.payload;
    }
    case ApplicantConstants.FILTER_APPLICANTS:{
        return action.payload;
    }
      case ApplicationConstants.FILTER_APPLICATIONS:{
        return action.payload;
    }
    
    default:{
      return searchTerm;
    }
  }
}
import ApplicantConstants from './jobApplicants';

export default function currentApplicantReducer(currentApplicant={},action){
    switch(action.type){
        case ApplicantConstants.SET_CURRENT_APPLICANT :{
             return action.payload ;
        }
        default:
            return currentApplicant;

    }
}

import {combineReducers} from 'redux';
import alertsReducer from './alerts';
import jobsReducer from './jobs';
import applicantsReducer from './jobApplicants';
import authReducer from './auth';
import applicationsReducer from './jobApplications';
import searchReducer from './search';
import currentApplicantReducer from './currentApplicant'
import currentJobReducer from './currentJob';
import appCommonReducer from './appCommon';



export * from './jobs';
export * from './jobApplicants';
export * from './alerts';
export * from './auth';
export * from './jobApplications';
export * from './currentApplicant';
export * from './currentJob';
export * from './appCommon';



const rootReducer=combineReducers({
  alerts: alertsReducer,
  jobs: jobsReducer,
  applicants: applicantsReducer,
  currentUser: authReducer,
  applications: applicationsReducer,
  searchTerm : searchReducer,
  currentApplicant: currentApplicantReducer,
  currentJob: currentJobReducer,
  appLoaded : appCommonReducer,
  //-------------add more reducers here---------//
})

export default rootReducer;

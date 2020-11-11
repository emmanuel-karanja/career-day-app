
import {combineReducers} from 'redux';
import alertsReducer from './alerts';
import jobsReducer from './jobs';
import applicantsReducer from './jobApplicants';
import authReducer from './auth';
import applicationsReducer from './jobApplications';
import searchReducer from './search';



export * from './jobs';
export * from './jobApplicants';
export * from './alerts';
export * from './auth';
export * from './jobApplications';



const rootReducer=combineReducers({
  alerts: alertsReducer,
  jobs: jobsReducer,
  applicants: applicantsReducer,
  authentication: authReducer,
  applications: applicationsReducer,
  searchTerm : searchReducer,
  //-------------add more reducers here---------//
})

export default rootReducer;

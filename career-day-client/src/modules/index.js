
import {combineReducers} from 'redux';
import alertsReducer from './alerts';
import jobsReducer from './jobs';
import applicantsReducer from './jobApplicants';
import authReducer from './auth';



export * from './jobs';
export * from './jobApplicants';
export * from './alerts';
export * from './auth';


const rootReducer=combineReducers({
  alerts: alertsReducer,
  jobs: jobsReducer,
  applicants: applicantsReducer,
  authentication: authReducer,
  //-------------add more reducers here---------//
})

export default rootReducer;

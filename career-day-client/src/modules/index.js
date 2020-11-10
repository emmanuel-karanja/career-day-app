
import {combineReducers} from 'redux';
import alertsReducer from './alerts';
import jobsReducer from './jobs';
import applicantsReducer from './jobApplicants';



export * from './jobs';
export * from './jobApplicants';
export * from './alerts';


const rootReducer=combineReducers({
  alerts: alertsReducer,
  jobs: jobsReducer,
  applicants: projectsReducer,
  //-------------add more reducers here---------//
})

export default rootReducer;

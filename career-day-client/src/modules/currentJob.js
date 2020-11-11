import {JobConstants} from './jobs';

export default function currentJobReducer(currentJob={},action){
    switch(action.type){
        case JobConstants.SET_CURRENT_JOB :{
             return action.payload 		 
        }
        default:
            return currentJob;

    }
}
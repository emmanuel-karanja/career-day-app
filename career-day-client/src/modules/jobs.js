
import {alertActions} from './alerts';
import {jobApi} from '../API/JobApi';

export const JobConstants={
   FETCH_JOBS_SUCCEEDED: 'FETCH_JOBS_SUCCEEDED',
   CREATE_JOB_SUCCEEDED: 'CREATE_JOB_SUCCEEDED',
   EDIT_JOB_SUCCEEDED: 'EDIT_JOB_SUCCEEDED',
   DELETE_JOB_SUCCEEDED: 'DELETE_JOB_SUCCEEDED',

   CURRENT_JOB_CHANGED:'CURRENT_JOB_CHANGED',
   SET_CURRENT_JOB:'SET_CURRENT_JOB',
   
};

export const JobStatusConstants={
  ACTIVE: 'Active',
  SUSPENDED:'Suspended',
  CANCELLED: 'Cancelled',
  EXPIRED: 'Expired'
};



export default function jobsReducer(jobs=[],action){
  switch(action.type){
    case JobConstants.FETCH_JOBS_SUCCEEDED :{
      return  action.payload;
    }

    case JobConstants.CREATE_JOB_SUCCEEDED:{
       return  jobs.concat(action.payload);
    }

    case JobConstants.EDIT_JOB_SUCCEEDED:{
      const nextJobs=jobs.map(job=>{
        if(job.jobId===action.payload.jobId){
            Object.assign({},job,action.payload);
        }
        return jobs;
      });
      return nextJobs;
    }

    case JobConstants.DELETE_JOB_SUCCEEDED:{
      const nextJobs=jobs.filter(job=>job.jobId !== action.payload.id);
      return  nextJobs;
    }

    default:{
      return jobs;
    }
  }
}


/*Action Creators */


export const fetchJobs=()=>{
  return  async (dispatch)=>{
    dispatch(alertActions.clear());
    try{
      const {data}=await jobApi.fetchAllJobs();
    dispatch(fetchJobsSucceeded(data));
        const defaultJobId=data.jobId;
        dispatch(fetchJob(defaultJobId));
      dispatch(alertActions.success('Jobs fetched successfully'))
    }catch(error){
      dispatch(alertActions.failure('Failed to fetch jobs',error.message));
    }
  }
}

 const fetchJobsSucceeded=(jobs)=>{
   return{
     type: JobConstants.FETCH_JOBS_SUCCEEDED,
     payload:jobs
   }
 }


 export const createJob=(newJob)=>{
   //const newJOB={title,description,status};
   return async dispatch=>{
     dispatch(alertActions.clear())
     try{
       const {data}=await jobApi.createJOB(newJob);
       dispatch(createJobSucceeded(data));
       dispatch(alertActions.success('Job Created Succesfully'));
       dispatch(fetchJob(data.jobId));
     }catch(error){
      dispatch(alertActions.failure('Failed to create job',error.message));
     }
   }
 }

 const createJobSucceeded=(newJob)=>{
   return{
     type: JobConstants.CREATE_JOB_SUCCEEDED,
     payload: newJob,
   };
 }

 export const updateJob=(job)=>{
   return async dispatch=>{
     dispatch(alertActions.clear())
     try{
        const data=await jobApi.updateJob(job);
        dispatch(editJobSucceeded(data));
        dispatch(alertActions.success('Job Updated'));
        dispatch(fetchJob(data.jobId));
     }catch(error){
       dispatch(alertActions.failure('Failed to update Job',error.message));
     }
   }
 }

 const editJobSucceeded=(updatedJob)=>{
   return{
     type:JobConstants.EDIT_JOB_SUCCEEDED,
     payload: updatedJob
   }
 }

 export const deleteJob=(id)=>{
   return async dispatch=>{
     dispatch(alertActions.clear());
     try{
       await jobApi.deleteJob(id)
       dispatch(deleteJobSucceeded(id));
       dispatch(alertActions.success('Job Deleted'));
     }catch(error){
       dispatch(alertActions.failure('Failed to delete job',error.message));
     }
   }
 }

 const deleteJobSucceeded=(id)=>{
   return {
     type: JobConstants.DELETE_JOB_SUCCEEDED,
     payload:id
   };
 }


export const fetchJob=(id)=>{
  return async dispatch=>{
    try{
      const data=await jobApi.getJobById(id);
      dispatch(setCurrentJob(data));
      dispatch(alertActions.success(`JOB ${data.name} fetched successfuly`))
    }catch(error){
     dispatch(alertActions.failure('Failed to fetch JOB',error.message));
    }
  }
}

const setCurrentJob=(job)=>{
  return {
    type: JobConstants.SET_CURRENT_JOB,
    payload: job
  }
}




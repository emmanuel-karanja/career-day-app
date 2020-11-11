import axios from 'axios';
import authApi from './AuthApi';

const API_BASE_URL='http://localhost:8080/api/v1';

const client =axios.create({
    baseURL: API_BASE_URL,
    headers:{
        'Content-Type' : 'application/json',
        //'Authorization' : authApi.getAuthBearerToken(),
	   'Access-Control-Allow-Origin' : 'http://localhost:3000'
    },
});

export const jobApi={
	
    fetchAllJobs,updateJob,createJob,deleteJob,fetchJobById
}

function fetchAllJobs(){
	console.log('called api.fetchjobs');
    return client.get('/jobs');
}

function fetchJobById(id){
     console.log(`jobApi.fetchJob jobId: ${id}`);
    return client.get(`/jobs/${id}`);
}

function createJob(newJob){
	console.log(`inside jobApi.createJob jobName : ${newJob.name}`);
    return client.post(`/jobs`,newJob);
}

function updateJob(updatedJob){
    return client.put(`/jobs/${updatedJob.jobId}`,updatedJob);
}

function deleteJob(id){
	console.log(`jobApi.deleteJob called jobId :${id}`);
    return client.delete(`/jobs/${id}`);
}
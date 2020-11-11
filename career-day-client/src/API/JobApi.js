import axios from 'axios';
import authApi from './AuthApi';

const API_BASE_URL='http://localhost:8080/api/v1';

const client =axios.create({
    baseURL: API_BASE_URL,
    headers:{
        'Content-Type' : 'application/json',
        'Authorization' : authApi.getAuthBearerToken(),
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
    return client.get(`/jobs/${id}`);
}

function createJob(newJob){
    return client.post(`/jobs`,newJob);
}

function updateJob(updatedJob){
    return client.put(`/jobs/${updatedJob.jobId}`,updatedJob);
}

function deleteJob(id){
    return client.delete(`/jobs/${id}`);
}
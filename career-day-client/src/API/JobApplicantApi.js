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

export const jobApplicantApi={
    fetchAllApplicants,updateApplicant,createApplicant,deleteApplicant,fetchApplicantById,
    fetchAllApplications,fetchApplicationById, createApplication,deleteApplication
}

function fetchAllApplicants(){
    return client.get('/job-applicants');
}

function fetchApplicantById(id){
    return client.get(`/job-applicants/${id}`);
}

function createApplicant(newApplicant){
    return client.post(`/job-applicants`,newApplicant);
}

function updateApplicant(updatedApplicant){
    return client.put(`/job-applicants/${updatedApplicant.applicantId}`,updatedApplicant);
}

function deleteApplicant(id){
    return client.delete(`/job-applicants/${id}`);
}

function fetchAllApplications(applicantId){
    return client.get(`/job-applicants/${applicantId}/applications`);
}

function fetchApplicationById(applicantId,applicationId){
    return client.get(`/job-applicants/${applicantId}/applications/${applicationId}`);
}

function deleteApplication(applicantId,applicationId){
    return client.delete(`/job-applicants/${applicantId}/applications/${applicationId}`);
}

function createApplication(applicantId,theJobId){
    const createRequest={
        jobId: theJobId,
    };
    return client.post(`/job-applicants/${applicantId}/applications`,createRequest);
}
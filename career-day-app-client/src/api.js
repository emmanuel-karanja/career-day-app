/* the front-end API to access the back-end API*/

import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost:8080/api/v1';

const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('Authorization', `Bearer ${token}`);
  }
}

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const auth = {
  current: () =>
    requests.get('/user/me'),
  login: (email, password) =>
    requests.post('/auth/login', { user: { email, password } }),
  isEmailAvailable: email=> 
    requests.post('/job-applicants/email-available',{email}),
  isPhoneAvailable: phone=>
    requests.post('/job-applicants/phone-available',{phone}),
};



const jobs = {
  getAll: () =>
    requests.get(`/jobs`),
  getOne: id =>
    requests.get(`/jobs/${id}`),
  delete: id =>
    requests.del(`/jobs/${id}`),
  update: (id,updatedjob) =>
    requests.put(`/jobs/${id}`, { updatedjob }),
  create: newJob =>
    requests.post('/jobs', {newJob })
};

const applicants = {
  create: (newApplicant) =>
    requests.post(`/job-applicants/register`, { newApplicant }),
  delete: id =>
    requests.del(`/job-applicants/${id}`),
  update: (id,updatedApplicant) =>
    requests.put(`/job-applicants/${id}`, { updatedApplicant }),
  getAll: () =>
    requests.get(`/job-applicants`),
  getOne: id =>
    requests.get(`/job-applicants/${id}`),
};

const applications = {
  create: (applicantId,newApplication) =>
    requests.post(`/job-applicants/${applicantId}/applications`, { newApplication }),
  delete: (applicantId,applicationId) =>
    requests.del(`/job-applicants/${applicantId}/applications/${applicationId}`),
  getAll: (applicantId) =>
    requests.get(`/job-applicants/${applicantId}/applications`),
  getOne: (applicantId,applicationId) =>
    requests.get(`/job-applicants/${applicantId}/applications/${applicationId}`),
};

export default {
  jobs,
  applicants,
  applications,
  auth,
  setToken: _token => { token = _token; }
};

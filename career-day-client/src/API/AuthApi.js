import axios from 'axios';

const API_BASE_URL='http://localhost:8080/api/v1/users';

const client =axios.create({
    baseURL: API_BASE_URL,
    headers:{
        'Content-Type' : 'application/json',
        //auth headers will be added here
    },
});

export const userApi={
    login,logout,getAuthHeader,
}

function login(credentials){
    const authResponse=client.get(`/login`,credentials);

    localStorage.setItem('user',JSON.stringify(authResponse));

    return Response;
}

function getAuthHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}

function logout(){
    localStorage.removeItem('user');
}
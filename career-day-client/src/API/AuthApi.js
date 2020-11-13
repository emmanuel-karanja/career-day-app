import axios from 'axios';

const API_BASE_URL='http://localhost:8080/api/v1/auth';



const client =axios.create({
    baseURL: API_BASE_URL,
    headers:{
        'Content-Type' : 'application/json',
        //auth headers will be added here
    },
});

const authApi={
    login,logout,getAuthBearerToken,getCurrentUser,resetUser
}

function login(credentials){ 
    const response=client.post(`/login`,credentials);
    if (response.ok){
       localStorage.setItem('user',JSON.stringify(response.data));
    }
    return response;
}

function getAuthBearerToken() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.jwtToken) {
        return `'Bearer ' + ${user.jwtToken}` ;
		console.log(user.jwtToken);
    } else {
        return null;
    }
}

function getCurrentUser(){
    let user=JSON.parse(localStorage.getItem('user'));
    if(user){
        return user;
    }else{
        return null;
    }
}

function resetUser(){
    localStorage.removeItem('user');
}

function logout(){
    localStorage.removeItem('user');
}


export default authApi;
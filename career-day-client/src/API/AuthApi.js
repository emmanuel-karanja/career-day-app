import axios from 'axios';

const API_BASE_URL='http://localhost:8080/api/v1/users';

const client =axios.create({
    baseURL: API_BASE_URL,
    headers:{
        'Content-Type' : 'application/json',
        //auth headers will be added here
    },
});

const authApi={
    login,logout,getAuthBearerToken,getCurrentUser
}

function login(credentials){
    
    const authResponse=client.get(`/login`,credentials);

    localStorage.setItem('user',JSON.stringify(authResponse));

    return Response;
}

function getAuthBearerToken() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.jwtToken) {
        return `'Bearer ' + ${user.jwtToken}` ;
    } else {
        return "";
    }
}

function getCurrentUser(){
    let user=JSON.parse(localStorage.getItem('user'));
    if(user){
        return {user}
    }else{
        return{};
    }
}

function logout(){
    localStorage.removeItem('user');
}

export default authApi;
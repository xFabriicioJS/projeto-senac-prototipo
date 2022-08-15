import axios from 'axios';

const API_URL = "http://localhost:8080/api/auth/";

function register(username, email, password) {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password
    });
};

function login(username, password){
    return axios.post(API_URL + "signin", {
        username,
        password
    }).then((response) => {
        if (response.data.accessToken){
            localStorage.setItem("usuario", JSON.stringify(response.data))
        }
        return response.data
    })
}

function logout(){
    localStorage.removeItem("usuario");
}
function getCurrentUser(){
    return JSON.parse(localStorage.getItem("usuario"));
}


const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;
import axios, { AxiosError } from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

function getPublicContent(){
    return axios.get(API_URL + "all")
};
function getUserBoard(){
    return axios.get(API_URL + "user", { headers: authHeader()});
};
function getAdminBoard(){
    return axios.get(API_URL + "admin", { headers: authHeader()});
};

const UserService = {
    getPublicContent,
    getUserBoard,
    getAdminBoard
}

// function getChamadosByUserId(id){
//     return axios.get(API_URL +  //blblall)
// }


export default UserService;

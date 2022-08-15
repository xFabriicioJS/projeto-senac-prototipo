import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/chamados"

function getAllChamados(){
    return axios.get(API_URL, {headers: authHeader()});
}

function getChamadosByUserId(id){
    return axios.get(`${API_URL}/PerUser/${id}`, {headers: authHeader()});
}

function getChamadoById(id){
    return axios.get(`${API_URL}/${id}`, {headers: authHeader()});
}

function addChamado(chamado){
    return axios.post(`${API_URL}`, chamado, {headers: authHeader()});
}



const TicketService = {
    getAllChamados,
    getChamadosByUserId,
    getChamadoById,
    addChamado
}

export default TicketService;
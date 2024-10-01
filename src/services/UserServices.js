// import axios from "axios";

import axios from './customize-axios';

const fetchAllUser = () => {
    return axios.get("/api/user?page=1");
}

const loginApi = (email, password) => {
    return axios.post("/api/login", { email, password }); 
} 

export { loginApi }
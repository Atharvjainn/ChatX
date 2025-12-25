import axios from 'axios';

export default axiosInstace = axios.create({
    baseURL : import.meta.env.MODE === "development" ? "http://localhost:3001/api" : "/api",
    withCredentials : true
});
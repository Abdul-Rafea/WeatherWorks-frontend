import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true, 
});

api.interceptors.response.use(
    (response) =>{
        return response;
    }
    ,(error) =>{
        if (error.response && error.response.status === 401){
            console.error("Unauthorized access - redirecting to login page");
            localStorage.removeItem("loginFlag");
            window.location.href = "/login";
        }

         return Promise.reject(error);
    }
);

export default api;
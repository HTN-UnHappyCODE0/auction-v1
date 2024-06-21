import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://bidding2024.group11tlu.uk",
});

axiosInstance.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem("currentAuthTokens") || "{}");
    if(token){
        config.headers = config.headers || {};
        const unprotectedRoutes = ["/login", "/api/User/register"];

        if(config.url && unprotectedRoutes.includes(config.url)){
            config.headers.Authorization = token ? `Bearer ${token.accessToken}` : "";
        }
    }
    return config;
})

export default axiosInstance;

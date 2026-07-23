import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use(config => {

    // If Authorization is already set (e.g. admin API), leave it alone
    if (config.headers.Authorization) {
        return config;
    }

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    response => response,
    error => {

        if (error.response?.status === 401) {

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            window.location.href = "/";
        }

        return Promise.reject(error);

    }
);

export default api;
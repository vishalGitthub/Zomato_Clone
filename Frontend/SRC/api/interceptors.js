import axiosInstance from "./axiosInstance";
import Cookies from "js-cookie";
let isRefreshing = false;
let failedRequestsQueue = [];

axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        console.log("Error Response:", error.response);
        if (error.response?.status === 401) {
            if (!originalRequest._retry) {
                originalRequest._retry = true;
            }
            else {
                return Promise.reject(error);
            }

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedRequestsQueue.push({ resolve, reject });
                })
                    .then(() => axiosInstance(originalRequest))
                    .catch((err) => Promise.reject(err));
            }

            isRefreshing = true;

            try {
                await axiosInstance.post('/users/refresh-accessToken')
                failedRequestsQueue.forEach((prom) => prom.resolve());
                failedRequestsQueue = [];
                console.log("Access token refreshed");
                return axiosInstance(originalRequest);
            } catch (refresherror) {
                failedRequestsQueue.forEach((prom) => prom.reject(refresherror));
                failedRequestsQueue = [];
                console.error("Session expired. Please log in again.");
                alert("Session expired! Please log in again.");
                return Promise.reject(refresherror);
            }
            finally{
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
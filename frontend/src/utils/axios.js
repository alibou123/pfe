import { message } from "antd";
import axios from "axios";
import localStorageService from "./localStorageService";

const apiHost = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({ baseURL: apiHost });

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorageService().getAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error.response) {
      if (error.response.status === 500) {
        message.info("Server is down please come again later !");
      } else if (error.response.status === 401) {
        message.info("Session expired please reconnect");
      } else {
        return Promise.reject(error);
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;

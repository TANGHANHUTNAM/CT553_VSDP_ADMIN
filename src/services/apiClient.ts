import axios from "axios";
import { createRef } from "react";
import toast from "react-hot-toast";
import { logout } from "../redux/authReducer";
import { store } from "../redux/store";
import { clearUser } from "../redux/userReducer";

const API_URL = import.meta.env.VITE_API_URL;

const axiosClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

type LoadingBar = {
  continuousStart: (startingValue?: number, refreshRate?: number) => void;
  staticStart: (startingValue?: number) => void;
  complete: () => void;
};

export const loadingBarRef = createRef<LoadingBar>();

axiosClient.interceptors.request.use(
  function (config) {
    const access_token = window.localStorage.getItem("access_token");
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }

    if (loadingBarRef.current) {
      loadingBarRef.current.continuousStart();
    }
    return config;
  },
  function (error) {
    if (loadingBarRef.current) {
      loadingBarRef.current.complete();
    }
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (loadingBarRef.current) {
      loadingBarRef.current.complete();
    }
    return response && response.data ? response.data : response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (loadingBarRef.current) {
      loadingBarRef.current.complete();
    }

    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/login") &&
      !originalRequest.url.includes("/auth/login-google")
    ) {
      originalRequest._retry = true;

      try {
        const response = await axios.get(`${API_URL}/auth/refresh_token`, {
          withCredentials: true,
        });

        if (response && response.data && response.data.data) {
          const { access_token } = response.data.data;
          localStorage.setItem("access_token", access_token);
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return axiosClient(originalRequest);
        }
        if (response && response.data && response.data.error) {
          toast.error(response.data.message);
          store.dispatch(logout());
          store.dispatch(clearUser());
        }
        // Retry the original request with the new token
      } catch (error) {
        // Handle refresh token error or redirect to login
        console.log("Refresh token error", error);
        store.dispatch(logout());
        store.dispatch(clearUser());
      }
    }

    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  },
);

export default axiosClient;

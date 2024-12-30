import axios from "axios";
import { createRef } from "react";

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
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (loadingBarRef.current) {
      loadingBarRef.current.complete();
    }
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  },
);

export default axiosClient;

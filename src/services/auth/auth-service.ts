import {
  IAuthLogoutResponse,
  IAuthRequest,
  IAuthRequestLoginGoogle,
  IAuthResponse,
  IResponse,
  IUserResponse,
} from "../../interfaces";
import axiosClient from "../apiClient";

export const loginService = async (
  data: IAuthRequest,
): Promise<IResponse<IAuthResponse>> => {
  return await axiosClient.post("/auth/login", data);
};

export const loginGoogleService = async (
  data: IAuthRequestLoginGoogle,
): Promise<IResponse<IAuthResponse>> => {
  return await axiosClient.post("/auth/login-google", data);
};

export const getAccountService = async (): Promise<
  IResponse<IUserResponse>
> => {
  return await axiosClient.get("/auth/account");
};

export const logoutService = async (): Promise<
  IResponse<IAuthLogoutResponse>
> => {
  return await axiosClient.post("/auth/logout");
};

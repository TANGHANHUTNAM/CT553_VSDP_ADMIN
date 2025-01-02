import {
  IAuthLogoutResponse,
  IAuthRequest,
  IAuthResponse,
  IResponse,
} from "../../interfaces";
import axiosClient from "../apiClient";

export const loginService = async (
  data: IAuthRequest,
): Promise<IResponse<IAuthResponse>> => {
  return await axiosClient.post("/auth/login", data);
};

export const logoutService = async (): Promise<
  IResponse<IAuthLogoutResponse>
> => {
  return await axiosClient.post("/auth/logout");
};

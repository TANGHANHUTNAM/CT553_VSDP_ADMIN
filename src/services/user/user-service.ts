import { IUserResponse, IResponse } from "../../interfaces";
import axiosClient from "../apiClient";

export const getAccountService = async (): Promise<
  IResponse<IUserResponse>
> => {
  return await axiosClient.get("/auth/account");
};

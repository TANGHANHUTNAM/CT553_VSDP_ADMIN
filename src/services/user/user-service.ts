import {
  IDataUserCreateRequest,
  IDataUsersResponse,
  IDataUserUpdateRequest,
  IResponse,
  IUserResponse,
  IUsersResponse,
} from "../../interfaces";
import axiosClient from "../apiClient";

export const getUsersService = async (
  query: string,
): Promise<IResponse<IDataUsersResponse>> => {
  return await axiosClient.get(`/users${query}`);
};

export const createUserService = async (
  data: IDataUserCreateRequest,
): Promise<IResponse<IUserResponse>> => {
  return await axiosClient.post("/users", data);
};

export const updateUserService = async (
  id: number,
  data: IDataUserUpdateRequest,
): Promise<IResponse<IUsersResponse>> => {
  return await axiosClient.patch(`/users/${id}`, data);
};
export const updateStatusUserService = async (
  id: number,
  status: number,
): Promise<IResponse<IUserResponse>> => {
  return await axiosClient.patch(`/users/status/${id}`, {
    status,
  });
};

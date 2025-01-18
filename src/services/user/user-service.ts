import {
  IDataUserCreateRequest,
  IDataUsersResponse,
  IDataUserUpdateProfileRequest,
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

export const getUserProfileService = async (): Promise<
  IResponse<IUsersResponse>
> => {
  return await axiosClient.get("/users/me/profile");
};

export const updateProfileService = async (
  data: IDataUserUpdateProfileRequest,
): Promise<IResponse<IUsersResponse>> => {
  return await axiosClient.patch("/users/me/profile", data);
};

export const updateAvatarProfileService = async (
  data: FormData,
): Promise<IResponse<IUsersResponse>> => {
  return await axiosClient.patch("/users/upload/avatar", data);
};

export const createListUsersService = async (
  users: IDataUserCreateRequest[],
): Promise<IResponse<IDataUserCreateRequest[]>> => {
  return await axiosClient.post("/users/batch", { users });
};

export const sendMailOTPService = async (
  email: string,
): Promise<IResponse<number>> => {
  return await axiosClient.post("/users/send-mail-otp", email);
};

export const verifyOTPService = async (
  email: string,
  otp: string,
): Promise<
  IResponse<{
    email: string;
    temp_token: string;
  }>
> => {
  return await axiosClient.post("/users/verify-otp", { email, otp });
};

export const changePasswordService = async (
  email: string,
  new_password: string,
  temp_token: string,
): Promise<IResponse<string>> => {
  return await axiosClient.post("/users/change-password", {
    email,
    new_password,
    temp_token,
  });
};

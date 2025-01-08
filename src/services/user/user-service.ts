import { IDataUsersResponse, IResponse } from "../../interfaces";
import axiosClient from "../apiClient";

export const getUsersService = async (
  query: string,
): Promise<IResponse<IDataUsersResponse>> => {
  return await axiosClient.get(`/users${query}`);
};

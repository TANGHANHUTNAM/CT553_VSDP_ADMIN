import { IResponse, IRolesResponse } from "../../interfaces";
import axiosClient from "../apiClient";

export const getAllRolesService = async (): Promise<
  IResponse<IRolesResponse[]>
> => {
  return await axiosClient.get("/roles/all");
};

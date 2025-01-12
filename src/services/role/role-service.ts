import {
  IDataRoleCreateRequest,
  IDataRolesResponse,
  IDataRoleUpdateRequest,
  IResponse,
  IRoleResponse,
  IRolesResponse,
} from "../../interfaces";
import axiosClient from "../apiClient";

export const getAllRolesService = async (): Promise<
  IResponse<IRolesResponse[]>
> => {
  return await axiosClient.get("/roles/all");
};

export const getAllRolesWithPaginationService = async (
  query: string,
): Promise<IResponse<IDataRolesResponse>> => {
  return await axiosClient.get(`/roles${query}`);
};

export const createRoleService = async (
  data: IDataRoleCreateRequest,
): Promise<IResponse<IRoleResponse>> => {
  return await axiosClient.post("/roles", data);
};

export const updateRoleService = async (
  id: number,
  data: IDataRoleUpdateRequest,
): Promise<IResponse<IRoleResponse>> => {
  return await axiosClient.patch(`/roles/${id}`, data);
};

export const updateStatusRoleService = async (
  id: number,
  status: number,
): Promise<IResponse<IRoleResponse>> => {
  return await axiosClient.patch(`/roles/status/${id}`, {
    status,
  });
};

export const updateRolePermissionsService = async (
  id: number,
  permissions: number[],
): Promise<IResponse<number[]>> => {
  return await axiosClient.patch(`/roles/${id}/permissions`, {
    permissions,
  });
};

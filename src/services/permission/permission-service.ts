import {
  IDataPermissionRequest,
  IDataPermissionsResponse,
  IPermissionResponse,
  IResponse,
} from "../../interfaces";
import axiosClient from "../apiClient";

export const getAllPermissionsWithPagination = async (
  query: string,
): Promise<IResponse<IDataPermissionsResponse>> => {
  return axiosClient.get(`/permissions${query}`);
};

export const getAllPermissionsService = async (): Promise<
  IResponse<IPermissionResponse[]>
> => {
  return axiosClient.get(`/permissions/all`);
};

export const getAllPermissionsByRoleIdService = async (
  roleId: number,
): Promise<IResponse<IPermissionResponse[]>> => {
  return axiosClient.get(`/permissions/role/${roleId}`);
};

export const createPermissionService = async (
  data: IDataPermissionRequest,
): Promise<IResponse<IPermissionResponse>> => {
  return axiosClient.post(`/permissions`, data);
};

export const updatePermissionService = async (
  id: number,
  data: IDataPermissionRequest,
): Promise<IResponse<IPermissionResponse>> => {
  return axiosClient.patch(`/permissions/${id}`, data);
};

export const deletePermissionService = async (
  id: number,
): Promise<IResponse<IPermissionResponse>> => {
  return axiosClient.delete(`/permissions/${id}`);
};

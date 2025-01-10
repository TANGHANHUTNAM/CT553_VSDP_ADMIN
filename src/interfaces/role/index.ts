import { IPaginationResponse } from "../response";

export interface IRolesResponse {
  id: number;
  name: string;
}

export interface IRoleResponse {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  active: boolean;
}

export interface IDataRolesResponse {
  roles: IRoleResponse[];
  pagination: IPaginationResponse;
}

export interface IDataRoleCreateRequest {
  name: string;
  description: string;
}

export interface IDataRoleUpdateRequest {
  name: string;
  description: string;
}

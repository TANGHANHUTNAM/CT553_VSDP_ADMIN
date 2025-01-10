import { IPaginationResponse } from "../response";

export interface IPermissionResponse {
  id?: number;
  name?: string;
  module: string;
  method: string;
  api_path: string;
  created_at?: string;
  updated_at?: string;
}

export interface IDataPermissionsResponse {
  permissions: IPermissionResponse[];
  pagination: IPaginationResponse;
}

export interface IDataPermissionRequest {
  name: string;
  module: string;
  method: string;
  api_path: string;
}

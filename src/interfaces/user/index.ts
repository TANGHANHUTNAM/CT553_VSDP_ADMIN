import { IPermissionResponse } from "../permission";
import { IPaginationResponse } from "../response";

export interface IUserResponse {
  user: {
    id: number;
    name: string;
    email: string;
    date_of_birth: string;
    gender: string;
    phone_number: string;
    avatar: string;
    generation: string;
    school: string;
    major: string;
    company: string;
    is_external_guest: boolean;
    active: boolean;
    roleId: number;
    role: IUserRoleResponse;
    permissions: IPermissionResponse[] | [];
  } | null;
}

export interface IUserRoleResponse {
  id: number;
  name: string;
  description: string;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface IUsersResponse {
  id: number;
  name: string;
  email: string;
  date_of_birth: string | null;
  gender: string | null;
  phone_number: string | null;
  avatar: string | null;
  generation: string | null;
  school: string | null;
  major: string | null;
  company: string | null;
  active: boolean;
  is_external_guest: boolean;
  created_at: string;
  updated_at: string;
  roleId: number;
  role: IUserRoleResponse | null;
}

export interface IDataUsersResponse {
  users: IUsersResponse[];
  pagination: IPaginationResponse;
}

export interface IDataUserCreateRequest {
  name: string;
  email: string;
  roleId: number;
}

export interface IDataUserUpdateRequest {
  name: string;
  email: string;
  roleId: number;
  date_of_birth: string;
  gender: string;
  phone_number: string;
  generation: string;
  school: string;
  major: string;
  company: string;
  is_external_guest: boolean;
}

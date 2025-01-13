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
    avatar_url: string;
    public_id: string;
    generation: string;
    school: string;
    major: string;
    company: string;
    is_external_guest: boolean;
    job_title: string;
    start_date: string;
    end_date: string;
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
  avatar_url: string | null;
  public_id: string | null;
  generation: string | null;
  school: string | null;
  major: string | null;
  company: string | null;
  active: boolean;
  is_external_guest: boolean;
  created_at: string;
  updated_at: string;
  job_title: string | null;
  start_date: string | null;
  end_date: string | null;
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
  start_date: string;
  end_date: string;
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
  job_title: string;
  start_date: string;
  end_date: string;
}

export interface IDataUserUpdateProfileRequest {
  name: string;
  date_of_birth: string;
  company: string;
  gender: string;
  genderation: string;
  job_title: string;
  major: string;
  phone_number: string;
  school: string;
}

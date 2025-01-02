import { IPermissionResponse } from "../permission";

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
}

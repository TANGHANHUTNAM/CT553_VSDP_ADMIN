import { IPaginationResponse } from "../response";

export interface IUniversityResponse {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface IDataUniversityResponse {
  universities: IUniversityResponse[];
  pagination: IPaginationResponse;
}

export interface IDataUniversityCreateRequest {
  name: string;
}

export interface IDataUniversityUpdateRequest {
  name: string;
  is_active: boolean;
}

import { IPaginationResponse } from "../response";

export interface IFormResponse {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  layout: string;
  scope: string;
  creator_name: string | null;
  creator_id: string | null;
  json_blocks: string;
  primary_color: string | null;
  background_color: string | null;
  start_date: string;
  end_date: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface IDataFormsResponse {
  forms: IFormResponse[];
  pagination: IPaginationResponse;
}

export interface IDataFormRequest {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  scope: string;
}

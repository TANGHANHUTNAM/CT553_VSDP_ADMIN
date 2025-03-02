import { FormBlockInstance } from "../form-block";

export interface IDataFormSectionResponse {
  id: number;
  name: string;
  description: string;
  json_blocks: FormBlockInstance[];
  created_at: string;
  updated_at: string;
  form_id: string;
}

export interface IDataFormSectionRequest {
  form_id?: string;
  name?: string;
  description?: string;
  json_blocks?: FormBlockInstance[];
}

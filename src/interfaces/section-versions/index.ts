import { FormBlockInstance } from "../form-block";

export interface IDataSectionVersionResponse {
  id: number;
  version: number;
  json_blocks: FormBlockInstance[];
  created_at: string;
  form_section_id: number;
}

export interface IDataSectionVersionRequest {
  form_section_id: number;
}

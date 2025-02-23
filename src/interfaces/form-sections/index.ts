import { IDataSectionVersionResponse } from "../section-versions";

export interface IDataFormSectionResponse {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  form_id: string;
}

export interface IDataFormSectionLastVersionResponse
  extends IDataFormSectionResponse {
  section_versions: IDataSectionVersionResponse;
}

export interface IDataFormSectionRequest {
  form_id: string;
  name: string;
  description: string;
}

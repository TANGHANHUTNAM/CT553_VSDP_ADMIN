import { FormBlockInstance } from "../form-block";
import { IScoringSecions } from "../form-scoring-sections";
import { IDataFormSectionResponse } from "../form-sections";
import { IPaginationResponse } from "../response";
import { IUniversityResponse } from "../university";

export interface IFormResponse {
  id: string;
  name: string;
  description: string;
  creator_name: string | null;
  creator_id: string | null;
  is_public: boolean;
  is_default: boolean;
  start_date: string;
  end_date: string;
  scope: string;
  primary_color: string | null;
  block_color: string | null;
  background_color: string | null;
  image_url: string | null;
  public_id: string | null;
  created_at: string;
  updated_at: string;
  form_sections?: IDataFormSectionResponse[];
  universities?: IUniversityResponse[];
  scoring_sections?: IScoringSecions[] | [];
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
  creator_name?: string;
  creator_id?: number;
}

export interface IFormUploadImageRequest {
  image: File;
  public_id: string;
}

export interface IFormBuilderRequest {
  json_blocks: FormBlockInstance[];
  primary_color: string;
  block_color: string;
  background_color: string;
}

export interface IDataShareLinkResponse {
  link: string;
  expiry_date: string;
}

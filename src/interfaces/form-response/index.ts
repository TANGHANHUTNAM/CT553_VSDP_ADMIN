import { IPaginationResponse } from "../response";

export interface IDataFormResponsesQueryRequest {
  formId: string;
  current: number;
  pageSize: number;
  search: string;
  universityId: number | null;
  filters: Record<string, unknown> | undefined;
  sortField: string | null;
  sortOrder: "ascend" | "descend";
  status: string | null;
}

export interface IFormResponsesResponse {
  id: number;
  name: string;
  phone_number: string;
  university: string;
  email: string;
  total_final_score: number | null;
  final_scores: Record<string, unknown>[] | [];
  status: string;
  created_at: string;
  form_id: string;
  snapshot_version: string;
  sections: ISectionsDataFormResponsesResponse[];
}

export interface IDataFormResponsesResponse {
  data: IFormResponsesResponse[];
  pagination: IPaginationResponse;
}

export interface ISectionsDataFormResponsesResponse {
  name: string;
  fields: IFieldSection[];
}

export interface IFieldSection {
  id: string;
  label: string;
  blockType: string;
  value:
    | string
    | number
    | { url: string; public_id: string }
    | { url: string; public_id: string }[]
    | string[]
    | number[]
    | []
    | null;
}

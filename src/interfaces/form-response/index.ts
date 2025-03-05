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
}

export interface IDataFormResponsesResponse {
  data: IFormResponsesResponse[];
  pagination: IPaginationResponse;
}

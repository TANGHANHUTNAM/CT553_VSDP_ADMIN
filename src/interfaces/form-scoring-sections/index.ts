import { IScoringCriteria } from "../form-scoring-criteria";

export interface IScoringSecions {
  id: number;
  name: string;
  description: string;
  max_score: number;
  created_at: string;
  updated_at: string;
  form_id: string;
  scoring_criteria?: IScoringCriteria[];
}

export interface IDataScoringSectionCreateRequest {
  name: string;
  description: string;
  max_score: number;
  form_id: string;
}

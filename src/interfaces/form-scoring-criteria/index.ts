export interface IScoringCriteria {
  id: number;
  name: string;
  description: string;
  max_score: number;
  min_score: number;
  created_at: string;
  updated_at: string;
  scoring_section_id: number;
}

export interface IDataScoringCriteriaCreateRequest {
  name: string;
  description: string;
  max_score: number;
  min_score: number;
  scoring_section_id: number;
}

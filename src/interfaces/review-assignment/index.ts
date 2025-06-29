import { IFormResponsesResponse } from "../form-response";

export interface IDataAssignmentReviewer {
  id: number;
  form_response: {
    id: number;
    form_id: string;
    name: string;
  };
  scoring_section: {
    id: number;
    name: string;
  };
  created_at: string;
}

export interface IAssignmentDetails {
  id: number;
  is_completed: boolean;
  completed_at: string | null;
  form_response_id: number;
  user_id: number;
  scoring_section_id: number;
  created_at: string;
  updated_at: string;
  scoring_section: {
    id: number;
    name: string;
    description: string;
    max_score: number;
    created_at: string;
    updated_at: string;
    form_id: string;
    scoring_criteria: {
      id: number;
      name: string;
      description: string;
      max_score: number;
      min_score: number;
      created_at: string;
      updated_at: string;
      scoring_section_id: number;
    }[];
  };
  form_response: IFormResponsesResponse;
}

export interface IScoreRequest {
  scoring_criteria_id: number;
  score_value: number;
  comment: string;
  user_id: number;
  form_response_id: number;
}

export interface IScore {
  criteriaId: number;
  criteriaName: string;
  scoreValue: number;
  maxScore: number;
  comment: string;
}

export interface ICompletedAssignment {
  assignmentId: number;
  formResponseId: number;
  formName: string;
  applicantName: string;
  applicantEmail: string;
  scoringSectionName: string;
  totalScore: number;
  maxScore: number;
  completedAt: string;
  scores: IScore[];
}

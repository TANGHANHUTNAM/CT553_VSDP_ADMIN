import { IResponse } from "../../interfaces";
import {
  IDataScoringCriteriaCreateRequest,
  IScoringCriteria,
} from "../../interfaces/form-scoring-criteria";
import apiClient from "../apiClient";

export const createScoringCriteriaService = async (
  data: IDataScoringCriteriaCreateRequest,
): Promise<IResponse<IScoringCriteria>> => {
  return apiClient.post(`/scoring-criterias`, data);
};

export const updateScoringCriteriaService = async (
  scoringCriteriaId: number,
  data: IDataScoringCriteriaCreateRequest,
): Promise<IResponse<IScoringCriteria>> => {
  return apiClient.patch(`/scoring-criterias/${scoringCriteriaId}`, data);
};

export const deleteScoringCriteriaService = async (
  scoringCriteriaId: number,
): Promise<IResponse<IScoringCriteria>> => {
  return apiClient.delete(`/scoring-criterias/${scoringCriteriaId}`);
};

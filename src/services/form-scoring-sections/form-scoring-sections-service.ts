import { IFormResponse, IResponse } from "../../interfaces";
import {
  IDataScoringSectionCreateRequest,
  IScoringSecions,
} from "../../interfaces/form-scoring-sections";
import apiClient from "../apiClient";

export const getAllScoringSectionsByFormIdService = async (
  formId: string,
): Promise<IResponse<IFormResponse>> => {
  return apiClient.get(`/scoring-sections?form_id=${formId}`);
};

export const createScoringSectionService = async (
  data: IDataScoringSectionCreateRequest,
): Promise<IResponse<IScoringSecions>> => {
  return apiClient.post(`/scoring-sections`, data);
};

export const updateScoringSectionService = async (
  scoringSectionId: number,
  data: IDataScoringSectionCreateRequest,
): Promise<IResponse<IScoringSecions>> => {
  return apiClient.patch(`/scoring-sections/${scoringSectionId}`, data);
};

export const deleteScoringSectionService = async (
  scoringSectionId: number,
): Promise<IResponse<IScoringSecions>> => {
  return apiClient.delete(`/scoring-sections/${scoringSectionId}`);
};

import {
  IDataFormResponsesQueryRequest,
  IDataFormResponsesResponse,
  IDataResponseFormUpdateRequest,
  IFormResponsesResponse,
  IResponse,
} from "../../interfaces";
import apiClient from "../apiClient";

export const getFormResponseService = async (
  data: IDataFormResponsesQueryRequest,
): Promise<IResponse<IDataFormResponsesResponse>> => {
  return apiClient.post(`/form-responses/search`, data);
};

export const getResponseDetailByIdService = async (
  id: number,
): Promise<IResponse<IFormResponsesResponse>> => {
  return apiClient.get(`/form-responses/${id}`);
};

export const updateResponseService = async (
  id: number,
  data: IDataResponseFormUpdateRequest,
): Promise<IResponse<string>> => {
  return apiClient.patch(`/form-responses/${id}`, data);
};

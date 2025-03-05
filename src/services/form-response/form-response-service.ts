import {
  IDataFormResponsesQueryRequest,
  IDataFormResponsesResponse,
  IResponse,
} from "../../interfaces";
import apiClient from "../apiClient";

export const getFormResponseService = async (
  data: IDataFormResponsesQueryRequest,
): Promise<IResponse<IDataFormResponsesResponse>> => {
  return apiClient.post(`/form-responses/search`, data);
};

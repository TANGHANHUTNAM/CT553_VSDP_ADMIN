import { IDataFormFilterResponse, IResponse } from "../../interfaces";
import apiClient from "../apiClient";

export const getAllResponseToFilterByFormIdService = async (
  form_id: string,
): Promise<IResponse<IDataFormFilterResponse[]>> => {
  return apiClient.get(`/form-responses/by_form/${form_id}/filter`);
};

export const approveResponseService = async (
  id: number,
): Promise<IResponse<IDataFormFilterResponse>> => {
  return apiClient.patch(`/form-responses/approve/${id}`);
};

export const rejectResponseService = async (
  id: number,
  data: {
    rejected_reason: string;
  },
): Promise<IResponse<IDataFormFilterResponse>> => {
  return apiClient.patch(`/form-responses/reject/${id}`, data);
};

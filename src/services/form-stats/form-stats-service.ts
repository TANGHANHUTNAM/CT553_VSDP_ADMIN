import {
  IDataFieldBlockResponse,
  IDataFieldBlockStatsResponse,
  IDataFormStatsRequest,
  IDataFormStatsResponse,
  IResponse,
} from "../../interfaces";
import axiosClient from "../apiClient";
export const getFormStatisticService = async (
  data: IDataFormStatsRequest,
): Promise<IResponse<IDataFormStatsResponse>> => {
  return axiosClient.post(`/forms/stats`, data);
};

export const getBlockTypeFilterService = async (
  form_id: string,
): Promise<IResponse<IDataFieldBlockResponse>> => {
  return axiosClient.get(`/forms/${form_id}/block-type`);
};

export const getStatsByFieldService = async (
  form_id: string,
  field_id: string,
): Promise<IResponse<IDataFieldBlockStatsResponse>> => {
  return axiosClient.get(`/forms/${form_id}/field-type?field_id=${field_id}`);
};

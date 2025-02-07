import {
  IDataFormRequest,
  IDataFormsResponse,
  IFormResponse,
  IResponse,
} from "../../interfaces";
import axiosClient from "../apiClient";

export const getAllFormsWithPagination = async (
  query: string,
): Promise<IResponse<IDataFormsResponse>> => {
  return axiosClient.get(`/forms${query}`);
};

export const getFormById = async (
  id: string,
): Promise<IResponse<IFormResponse>> => {
  return axiosClient.get(`/forms/${id}`);
};

export const createFormService = async (
  data: IDataFormRequest,
): Promise<IResponse<IFormResponse>> => {
  return axiosClient.post(`/forms`, data);
};

export const updateFormService = async (
  id: string,
  data: IDataFormRequest,
): Promise<IResponse<IFormResponse>> => {
  return axiosClient.patch(`/forms/${id}`, data);
};

export const updateStatusFormService = async (
  id: string,
  status: number,
): Promise<IResponse<IFormResponse>> => {
  return axiosClient.patch(`/forms/${id}/status`, { status });
};

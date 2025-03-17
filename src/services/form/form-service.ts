import {
  IDataFormRequest,
  IDataFormsResponse,
  IFormBuilderRequest,
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

export const copyFormService = async (
  id: string,
): Promise<IResponse<IFormResponse>> => {
  return axiosClient.post(`/forms/${id}/copy`);
};

export const updateStatusFormService = async (
  id: string,
  is_default: boolean,
): Promise<IResponse<IFormResponse>> => {
  return axiosClient.patch(`/forms/${id}/status`, { is_default });
};

export const updateStyleFormService = async (
  id: string,
  data: FormData,
): Promise<IResponse<IFormResponse>> => {
  return axiosClient.patch(`/forms/${id}/style/update`, data);
};

export const updateStatusPublicFormService = async (
  id: string,
  is_public: boolean,
): Promise<IResponse<IFormResponse>> => {
  return axiosClient.patch(`/forms/${id}/status/public`, { is_public });
};

export const saveFormBuilderService = async (
  id: string,
  data: IFormBuilderRequest,
): Promise<IResponse<IFormResponse>> => {
  return axiosClient.patch(`/forms/${id}/builder/update`, data);
};

export const getFormBuilderPreviewService = async (
  id: string,
): Promise<IResponse<IFormResponse>> => {
  return axiosClient.get(`/forms/preview/${id}`);
};

export const exportExcelFormService = async (id: string): Promise<Blob> => {
  return axiosClient.get(`/forms/${id}/export-excel`, {
    responseType: "blob",
  });
};

export const shareLinkFormService = async (
  id: string,
  data: { expiry_dates: number },
): Promise<IResponse<string>> => {
  return axiosClient.post(`/forms/${id}/share-link`, data);
};

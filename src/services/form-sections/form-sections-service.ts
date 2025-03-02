import { IResponse } from "../../interfaces";
import {
  IDataFormSectionRequest,
  IDataFormSectionResponse,
} from "../../interfaces/form-sections";
import axiosClient from "../apiClient";

export const createNewSectionFormService = async (
  data: IDataFormSectionRequest,
): Promise<IResponse<IDataFormSectionResponse[]>> => {
  return axiosClient.post(`/sections-form`, data);
};

export const updateSectionFormService = async (
  id: number,
  data: IDataFormSectionRequest,
): Promise<IResponse<IDataFormSectionResponse[]>> => {
  return axiosClient.patch(`/sections-form/${id}`, data);
};

export const deleteSectionFormService = async (
  id: number,
): Promise<IResponse<IDataFormSectionResponse[]>> => {
  return axiosClient.delete(`/sections-form/${id}`);
};

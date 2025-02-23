import { IResponse } from "../../interfaces";
import { FormBlockInstance } from "../../interfaces/form-block";
import {
  IDataFormSectionLastVersionResponse,
  IDataFormSectionRequest,
  IDataFormSectionResponse,
} from "../../interfaces/form-sections";
import axiosClient from "../apiClient";

export const createNewSectionFormService = async (
  data: IDataFormSectionRequest,
): Promise<IResponse<IDataFormSectionResponse>> => {
  return axiosClient.post(`/sections-form`, data);
};

export const getAllSectionsLastVersionByFormIdService = async (
  formId: string,
): Promise<IResponse<IDataFormSectionLastVersionResponse[]>> => {
  return axiosClient.get(`/sections-form/form/${formId}`);
};

export const getCreateNewSectionByFormIdService = async (
  data: IDataFormSectionRequest,
): Promise<IResponse<IDataFormSectionResponse>> => {
  return axiosClient.post(`/sections-form`, data);
};

export const updateVersionSectionService = async (
  id: number,
  json_blocks: FormBlockInstance[],
): Promise<IResponse<IDataFormSectionLastVersionResponse>> => {
  return axiosClient.patch(`/section-versions/${id}`, { json_blocks });
};

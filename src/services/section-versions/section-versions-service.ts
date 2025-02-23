import { IResponse } from "../../interfaces";
import {
  IDataSectionVersionRequest,
  IDataSectionVersionResponse,
} from "../../interfaces/section-versions";
import axiosClient from "../apiClient";

export const createNewVersionSectionService = async (
  data: IDataSectionVersionRequest,
): Promise<IResponse<IDataSectionVersionResponse>> => {
  return axiosClient.post(`/section-versions`, data);
};

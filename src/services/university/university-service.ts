import {
  IDataUniversityCreateRequest,
  IDataUniversityResponse,
  IDataUniversityUpdateRequest,
  IResponse,
  IUniversityResponse,
} from "../../interfaces";
import axiosClient from "../apiClient";

export const getAllUniversitiesService = async (): Promise<
  IResponse<IUniversityResponse[]>
> => {
  return await axiosClient.get("/universities/all");
};

export const getAllUniversitiesWithPaginationService = async (
  query: string,
): Promise<IResponse<IDataUniversityResponse>> => {
  return await axiosClient.get(`/universities${query}`);
};

export const createUniversityService = async (
  data: IDataUniversityCreateRequest,
): Promise<IResponse<IUniversityResponse>> => {
  return await axiosClient.post("/universities", data);
};

export const updateUniversityService = async (
  id: number,
  data: IDataUniversityUpdateRequest,
): Promise<IResponse<IUniversityResponse>> => {
  return await axiosClient.patch(`/universities/${id}`, data);
};

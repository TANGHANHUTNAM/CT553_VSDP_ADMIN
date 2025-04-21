import axiosClient from "../apiClient";

import { IResponse } from "../../interfaces";
import { DashboardData } from "../../features/dashboard/DashboardManagement";

export const getDashboardService = async (
  params: string,
): Promise<IResponse<DashboardData>> => {
  return await axiosClient.get(`/dashboard?${params}`);
};

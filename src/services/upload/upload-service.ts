import axios from "axios";
import axiosClient from "../apiClient";
import { IResponse } from "../../interfaces";

const URL_CLOUDINARY = import.meta.env.VITE_URL_CLOUDINARY;
const CLOUD_NAME = import.meta.env.VITE_CLOUDE_NAME;

export const uploadFileService = async (
  resourceType: string,
  data: FormData,
) => {
  const url = `${URL_CLOUDINARY}/${CLOUD_NAME}`;
  return await axios.post(`${url}/${resourceType}/upload`, data);
};

export const deleteFileService = async (
  publicId: string,
): Promise<IResponse<string>> => {
  return await axiosClient.delete(`/cloudinary/file/delete`, {
    data: {
      public_id: publicId,
    },
  });
};

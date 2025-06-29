import { IResponse } from "../../interfaces";
import {
  IDataFormResponseAssignmentWithReviewer,
  IDetailsReviewer,
  IReviewer,
} from "../../interfaces/form-assignment";
import apiClient from "../apiClient";

export const getFormResponsesWithReviewersService = async (
  form_id: string,
  scoring_section_id: number | null,
  searchText: string,
  universityId: number | null,
  current: number,
  pageSize: number,
  assigned?: boolean | undefined,
): Promise<IResponse<IDataFormResponseAssignmentWithReviewer>> => {
  let url = `/form-assginment-response/with-reviewers/by_form/${form_id}/scoring_section/${scoring_section_id}?search=${searchText}&universityId=${universityId}&current=${current}&pageSize=${pageSize}`;

  if (assigned !== undefined) {
    url += `&assigned=${assigned}`;
  }

  return await apiClient.get(url);
};

export const getAllReviersService = async (): Promise<
  IResponse<IReviewer[]>
> => {
  return await apiClient.get(
    `/form-assginment-response/with-reviewers/all-reviewers`,
  );
};

export const assignReviewerToFormResponseService = async (
  form_response_id: number[],
  reviewer_ids: number[],
  section_score_id: number,
): Promise<IResponse<IReviewer[]>> => {
  return await apiClient.post(
    `/form-assginment-response/assign-reviewer/${section_score_id}`,
    {
      reviewerId: reviewer_ids,
      formResponseId: form_response_id,
    },
  );
};

export const viewDetailsReviewerService = async (
  reviewer_id: number,
): Promise<IResponse<IDetailsReviewer>> => {
  return await apiClient.get(
    `/form-assginment-response/reviewer/${reviewer_id}`,
  );
};

export const deleteReviewerAssignmentService = async (
  reviewer_id: number,
  form_response_id: number,
  section_score_id: number,
): Promise<IResponse<{ count: number }>> => {
  return await apiClient.delete(
    `/form-assginment-response/reviewer?formResponseId=${form_response_id}&reviewerId=${reviewer_id}&sectionScoreId=${section_score_id}`,
  );
};

// export const eventNotificationService = async (
//   reviewer: number,
// ): Promise<IResponse<any>> => {
//   return await apiClient.get(`/notifications/events?userId=${reviewer}`);
// };

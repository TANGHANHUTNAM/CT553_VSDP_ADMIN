import {
  IAssignmentDetails,
  ICompletedAssignment,
  IDataAssignmentReviewer,
  IResponse,
  IScoreRequest,
} from "../../interfaces";
import apiClient from "../apiClient";

export const getPendingAssignmentService = async (
  reviewer: number,
): Promise<IResponse<IDataAssignmentReviewer[]>> => {
  return await apiClient.get(
    `/review-applicant/form-response/assigned/for-reviewers/${reviewer}`,
  );
};

export const getDetailAssignmentForUserIdService = async (
  user_id: number,
  assignment_id: number,
): Promise<IResponse<IAssignmentDetails>> => {
  return await apiClient.get(
    `/review-applicant?user_id=${user_id}&assignment_id=${assignment_id}`,
  );
};

export const saveScoreService = async (
  assignmentId: number,
  scores: IScoreRequest[],
): Promise<IResponse<{ message: string }>> => {
  return await apiClient.post("/review-applicant/scores", {
    assignmentId,
    scores,
  });
};

export const getCompletedAssignmentsService = async (): Promise<
  IResponse<ICompletedAssignment[]>
> => {
  return await apiClient.get(`/review-applicant/completed`);
};

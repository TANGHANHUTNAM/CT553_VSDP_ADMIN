import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getDetailAssignmentForUserIdService } from "../../services";
import { useAppSelector } from "../../hooks";
import { Empty } from "antd";
import LoadingComponent from "../../components/LoadingComponent";
import ReviewApplicantAssigned from "./ReviewApplicantAssigned";

const ReviewApplicantDetailManagement: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const { assignment_id } = useParams<{
    assignment_id: string;
  }>();
  const { data: dataAssignmentDetails, isLoading } = useQuery({
    queryKey: ["assignmentDetails", assignment_id, user?.id],
    queryFn: async () => {
      return (
        await getDetailAssignmentForUserIdService(user!.id, +assignment_id!)
      ).data;
    },
    enabled: !!user?.id && !!assignment_id,
    refetchOnWindowFocus: false,
  });
  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <div>
      {dataAssignmentDetails ? (
        <ReviewApplicantAssigned detailAssignment={dataAssignmentDetails} />
      ) : (
        <div className="flex min-h-screen items-center justify-center">
          <Empty description="Không tìm thấy hồ sơ được phân công" />
        </div>
      )}
    </div>
  );
};

export default ReviewApplicantDetailManagement;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import DeleteComponent from "../../components/DeleteComponent";
import { deleteReviewerAssignmentService } from "../../services";
import toast from "react-hot-toast";

interface IModalDeleteReviewerAssignmentProps {
  name?: string;
  reviewer_id: number;
  form_response_id: number;
  section_score_id: number;
}

const ModalDeleteReviewerAssignment: React.FC<
  IModalDeleteReviewerAssignmentProps
> = ({ name, reviewer_id, form_response_id, section_score_id }) => {
  const queryClient = useQueryClient();
  const mutationDeleteReviewerAssignment = useMutation({
    mutationFn: async () => {
      return await deleteReviewerAssignmentService(
        reviewer_id,
        form_response_id,
        section_score_id,
      );
    },
    onSuccess: (data) => {
      if (data && data.data) {
        toast.success(data.message as string);
        queryClient.invalidateQueries({
          queryKey: ["form-response-detail-reviewer"],
        });
      }
      if (data && data.error) {
        toast.error(data.message as string);
      }
    },
    onError: () => {
      toast.error("Có lỗi xảy ra trong quá trình xóa người đánh giá");
    },
  });
  return (
    <>
      <DeleteComponent
        titlePopconfirm={`Loại người đánh giá ${name}`}
        onConfirm={() => {
          mutationDeleteReviewerAssignment.mutate();
        }}
      />
    </>
  );
};

export default ModalDeleteReviewerAssignment;

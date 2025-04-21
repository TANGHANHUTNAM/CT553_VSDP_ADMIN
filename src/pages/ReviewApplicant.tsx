import { PAGE_NAME } from "../constants/routerIndex";
import ReviewApplicantManangement from "../features/review/ReviewApplicantManangement";
import { useDynamicTitle, useScrollTop } from "../hooks";
import LayoutPage from "../layout/LayoutPage";

const ReviewApplicant: React.FC = () => {
  useDynamicTitle(PAGE_NAME.REVIEW_APPLICATION);
  useScrollTop();
  return (
    <LayoutPage>
      <ReviewApplicantManangement />
    </LayoutPage>
  );
};

export default ReviewApplicant;

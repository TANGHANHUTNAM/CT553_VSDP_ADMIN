import { PAGE_NAME } from "../constants/routerIndex";
import ReviewApplicantDetailManagement from "../features/review-applicant-detail/ReviewApplicantDetailManagement";
import { useDynamicTitle, useScrollTop } from "../hooks";
import LayoutPage from "../layout/LayoutPage";

const ReviewApplicantsDetailPage: React.FC = () => {
  useDynamicTitle(PAGE_NAME.DETAIL_REVIEW_APPLICATION);
  useScrollTop();
  return (
    <LayoutPage>
      <ReviewApplicantDetailManagement />
    </LayoutPage>
  );
};

export default ReviewApplicantsDetailPage;

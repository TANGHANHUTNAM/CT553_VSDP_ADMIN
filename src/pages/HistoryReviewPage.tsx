import { PAGE_NAME } from "../constants/routerIndex";
import HistoryReviewManagement from "../features/history-review/HistoryReviewManagement";
import { useDynamicTitle, useScrollTop } from "../hooks";
import LayoutPage from "../layout/LayoutPage";

const HistoryReviewPage: React.FC = () => {
  useDynamicTitle(PAGE_NAME.REVIEW_HISTORY);
  useScrollTop();
  return (
    <LayoutPage>
      <HistoryReviewManagement />
    </LayoutPage>
  );
};

export default HistoryReviewPage;

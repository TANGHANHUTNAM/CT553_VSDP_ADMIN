import { PAGE_NAME } from "../constants/routerIndex";
import UniversityManagement from "../features/university/UniversityManagement";
import { useDynamicTitle, useScrollTop } from "../hooks";
import LayoutPage from "../layout/LayoutPage";

const UniversityPage: React.FC = () => {
  useDynamicTitle(PAGE_NAME.UNIVERSITY);
  useScrollTop();
  return (
    <LayoutPage>
      <UniversityManagement />
    </LayoutPage>
  );
};

export default UniversityPage;

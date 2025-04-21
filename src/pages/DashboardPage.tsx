import { PAGE_NAME } from "../constants/routerIndex";
import DashboardManagement from "../features/dashboard/DashboardManagement";
import { useDynamicTitle, useScrollTop } from "../hooks";
import LayoutPage from "../layout/LayoutPage";

const DashboardPage: React.FC = () => {
  useDynamicTitle(PAGE_NAME.DASHBOARD);
  useScrollTop();
  return (
    <>
      <LayoutPage name={``}>
        <DashboardManagement />
      </LayoutPage>
    </>
  );
};

export default DashboardPage;

import LayoutPage from "../layout/LayoutPage";
import logo from "../assets/logo.png";
import { useDynamicTitle, useScrollTop } from "../hooks";
import { PAGE_NAME } from "../constants/routerIndex";

const DashboardPage: React.FC = () => {
  useDynamicTitle(PAGE_NAME.DASHBOARD);
  useScrollTop();
  return (
    <>
      <LayoutPage>
        <div className="">DashboardPage</div>
        <img src={logo} alt="" />
      </LayoutPage>
    </>
  );
};

export default DashboardPage;

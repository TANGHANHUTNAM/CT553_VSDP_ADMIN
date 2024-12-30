import LayoutPage from "../layout/LayoutPage";
import logo from "../assets/logo.png";
import { useDynamicTitle, useScrollTop } from "../hooks";
interface IDashboardPageProps {}

const DashboardPage: React.FC<IDashboardPageProps> = ({}) => {
  useDynamicTitle("Dashboard");
  useScrollTop();
  return (
    <>
      <LayoutPage>
        <div className="">DashboardPage</div>
        <img src={logo} alt="" />
        <img src={logo} alt="" />
        <img src={logo} alt="" />
        <img src={logo} alt="" />
        <img src={logo} alt="" />
        <img src={logo} alt="" />
      </LayoutPage>
    </>
  );
};

export default DashboardPage;

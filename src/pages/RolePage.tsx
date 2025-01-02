import { PAGE_NAME } from "../constants/routerIndex";
import { useDynamicTitle, useScrollTop } from "../hooks";
import LayoutPage from "../layout/LayoutPage";

interface IRolePageProps {}

const RolePage: React.FC<IRolePageProps> = ({}) => {
  useDynamicTitle(PAGE_NAME.ROLE);
  useScrollTop();
  return (
    <>
      <LayoutPage>Vai trò</LayoutPage>
    </>
  );
};

export default RolePage;

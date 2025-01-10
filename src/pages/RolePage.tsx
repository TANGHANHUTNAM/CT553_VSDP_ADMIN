import { PAGE_NAME } from "../constants/routerIndex";
import RoleManagement from "../features/role/RoleManagement";
import { useDynamicTitle, useScrollTop } from "../hooks";
import LayoutPage from "../layout/LayoutPage";

const RolePage: React.FC = () => {
  useDynamicTitle(PAGE_NAME.ROLE);
  useScrollTop();
  return (
    <>
      <LayoutPage>
        <RoleManagement />
      </LayoutPage>
    </>
  );
};

export default RolePage;

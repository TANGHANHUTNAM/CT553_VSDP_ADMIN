import { PAGE_NAME } from "../constants/routerIndex";
import PermissionManagement from "../features/permission/PermissionManagement";
import { useDynamicTitle, useScrollTop } from "../hooks";
import LayoutPage from "../layout/LayoutPage";

const PermissionPage: React.FC = () => {
  useDynamicTitle(PAGE_NAME.PERMISSION);
  useScrollTop();
  return (
    <>
      <LayoutPage>
        <PermissionManagement />
      </LayoutPage>
    </>
  );
};

export default PermissionPage;

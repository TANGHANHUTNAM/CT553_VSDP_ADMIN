import { PAGE_NAME } from "../constants/routerIndex";
import { useDynamicTitle, useScrollTop } from "../hooks";
import LayoutPage from "../layout/LayoutPage";

interface IPermissionPageProps {}

const PermissionPage: React.FC<IPermissionPageProps> = ({}) => {
  useDynamicTitle(PAGE_NAME.PERMISSION);
  useScrollTop();
  return (
    <>
      <LayoutPage>Vai trò</LayoutPage>
    </>
  );
};

export default PermissionPage;

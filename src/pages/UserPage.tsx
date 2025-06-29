import { PAGE_NAME } from "../constants/routerIndex";
import UserManagement from "../features/user/UserManagement";
import { useDynamicTitle, useScrollTop } from "../hooks";
import LayoutPage from "../layout/LayoutPage";

const UserPage: React.FC = () => {
  useDynamicTitle(PAGE_NAME.USER);
  useScrollTop();
  return (
    <>
      <LayoutPage>
        <UserManagement />
      </LayoutPage>
    </>
  );
};

export default UserPage;

import { PAGE_NAME } from "../constants/routerIndex";
import ProfileManagement from "../features/profile/ProfileManagement";
import { useDynamicTitle, useScrollTop } from "../hooks";
import LayoutPage from "../layout/LayoutPage";

const ProfilePage: React.FC = () => {
  useDynamicTitle(PAGE_NAME.PROFILE);
  useScrollTop();

  return (
    <LayoutPage>
      <ProfileManagement />
    </LayoutPage>
  );
};

export default ProfilePage;

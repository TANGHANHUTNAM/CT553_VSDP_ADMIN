import { PAGE_NAME } from "../constants/routerIndex";
import { useDynamicTitle, useScrollTop } from "../hooks";

const ProfilePage: React.FC = () => {
  useDynamicTitle(PAGE_NAME.PROFILE);
  useScrollTop();
  // const handle;
  return <></>;
};

export default ProfilePage;

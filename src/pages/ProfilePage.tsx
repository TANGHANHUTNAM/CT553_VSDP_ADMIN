import { useDynamicTitle, useScrollTop } from "../hooks";
import LayoutPage from "../layout/LayoutPage";

interface IProfilePageProps {}

const ProfilePage: React.FC<IProfilePageProps> = ({}) => {
  useDynamicTitle("Trang cá nhân");
  useScrollTop();
  return <>{/* <LayoutPage>Profile</LayoutPage> */}</>;
};

export default ProfilePage;

import { PAGE_NAME } from "../constants/routerIndex";
import { useDynamicTitle, useScrollTop } from "../hooks";
import LayoutPage from "../layout/LayoutPage";

const SettingPage: React.FC = () => {
  useDynamicTitle(PAGE_NAME.SETTING);
  useScrollTop();
  return <LayoutPage>Setting</LayoutPage>;
};

export default SettingPage;

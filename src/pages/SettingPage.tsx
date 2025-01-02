import { Button, ConfigProvider, Divider, Input, Space, theme } from "antd";
import { useDynamicTitle, useScrollTop } from "../hooks";
import LayoutPage from "../layout/LayoutPage";
import { PAGE_NAME } from "../constants/routerIndex";

interface ISettingPageProps {}

const SettingPage: React.FC<ISettingPageProps> = ({}) => {
  useDynamicTitle(PAGE_NAME.SETTING);
  useScrollTop();
  return <LayoutPage>Setting</LayoutPage>;
};

export default SettingPage;

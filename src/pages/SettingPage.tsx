import { Button, ConfigProvider, Divider, Input, Space, theme } from "antd";
import { useDynamicTitle, useScrollTop } from "../hooks";
import LayoutPage from "../layout/LayoutPage";

interface ISettingPageProps {}

const SettingPage: React.FC<ISettingPageProps> = ({}) => {
  useDynamicTitle("Cài đặt");
  useScrollTop();
  return (
    <LayoutPage>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: "#00b96b",
              algorithm: true, // Enable algorithm
            },
            Input: {
              colorPrimary: "#eb2f96",
              algorithm: true, // Enable algorithm
            },
          },
        }}
      >
        <Space>
          <div style={{ fontSize: 14 }}>Enable algorithm: </div>
          <Input placeholder="Please Input" />
          <Button type="primary">Submit</Button>
        </Space>
      </ConfigProvider>
      <Divider />
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: "#00b96b",
            },
            Input: {
              colorPrimary: "#eb2f96",
            },
          },
        }}
      >
        <Space>
          <div style={{ fontSize: 14 }}>Disable algorithm: </div>
          <Input placeholder="Please Input" />
          <Button type="primary">Submit</Button>
        </Space>
      </ConfigProvider>
    </LayoutPage>
  );
};

export default SettingPage;

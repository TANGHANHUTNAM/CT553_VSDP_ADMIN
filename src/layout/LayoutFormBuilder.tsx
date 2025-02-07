import { ConfigProvider, theme } from "antd";
import { Outlet } from "react-router-dom";
import HeaderFormBuilder from "../components/form-builder/HeaderFormBuilder";
import {
  GLOBAL_COLOR,
  GLOBAL_COLOR_ERROR,
  GLOBAL_COLOR_SUCCESS,
} from "../constants/colorCustom";
import BackToTop from "../components/BackToTop";

const LayoutFormBuilder: React.FC = () => {
  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
          token: {
            colorPrimary: GLOBAL_COLOR,
            colorSuccess: GLOBAL_COLOR_SUCCESS,
            colorError: GLOBAL_COLOR_ERROR,
            borderRadius: 4,
            colorText: "#333",
          },
        }}
      >
        <HeaderFormBuilder />
        <div className="relative bg-transparent">
          <BackToTop />
          <Outlet />
        </div>
      </ConfigProvider>
    </>
  );
};

export default LayoutFormBuilder;

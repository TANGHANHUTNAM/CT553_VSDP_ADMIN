import { ConfigProvider, theme } from "antd";
import { Outlet, useParams } from "react-router-dom";
import BackToTop from "../components/BackToTop";
import HeaderFormBuilder from "../components/form-builder/HeaderFormBuilder";
import {
  GLOBAL_COLOR,
  GLOBAL_COLOR_ERROR,
  GLOBAL_COLOR_SUCCESS,
} from "../constants/colorCustom";
import { useQuery } from "@tanstack/react-query";
import { getFormById } from "../services";

const LayoutFormBuilder: React.FC = () => {
  const param = useParams();
  const form_id = param["form_id"];
  const { data: dataForm } = useQuery({
    queryKey: ["getFormById", form_id],
    queryFn: () => getFormById(form_id || ""),
  });
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
        {dataForm && dataForm.data && (
          <HeaderFormBuilder formData={dataForm.data} />
        )}
        <div className="relative bg-transparent">
          <BackToTop />
          <Outlet />
        </div>
      </ConfigProvider>
    </>
  );
};

export default LayoutFormBuilder;

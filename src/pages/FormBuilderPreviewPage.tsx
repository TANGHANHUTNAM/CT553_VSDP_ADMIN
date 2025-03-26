import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent";
import NotFoundComponent from "../components/NotFoundComponent";
import { PAGE_NAME } from "../constants/routerIndex";
import { BuilderPreviewContext } from "../context/form-builder-preview/BuildPreviewContext";
import BuilderPreview from "../features/form-preview/BuilderPreview";
import { useDynamicTitle, useScrollTop } from "../hooks";
import { getFormBuilderPreviewService } from "../services";
import { ConfigProvider } from "antd";

const FormBuilderPreviewPage: React.FC = () => {
  useDynamicTitle(PAGE_NAME.FORM_BUILDER_PREVIEW);
  useScrollTop();
  const params = useParams<{ form_id: string }>();
  const form_id = params.form_id;
  const { data, isLoading } = useQuery({
    queryKey: ["getFormPreview", form_id],
    queryFn: async () => getFormBuilderPreviewService(form_id || ""),
    enabled: !!form_id,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <div>
          {!data?.data ? (
            <NotFoundComponent />
          ) : (
            <BuilderPreviewContext.Provider
              value={{
                formPreview: data.data,
              }}
            >
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: data.data.primary_color as string,
                  },
                }}
              >
                <BuilderPreview />
              </ConfigProvider>
            </BuilderPreviewContext.Provider>
          )}
        </div>
      )}
    </div>
  );
};

export default FormBuilderPreviewPage;

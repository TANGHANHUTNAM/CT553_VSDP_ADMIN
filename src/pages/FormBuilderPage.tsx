import { useQuery } from "@tanstack/react-query";
import { PAGE_NAME } from "../constants/routerIndex";
import { BuilderContext } from "../context/form-builder/BuilderContext";
import BuilderForm from "../features/form-builder/BuilderForm";
import { useDynamicTitle, useScrollTop } from "../hooks";
import { getFormById } from "../services";
import { useParams } from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent";

const FormBuilderPage: React.FC = () => {
  useDynamicTitle(PAGE_NAME.FORM_BUILDER);
  useScrollTop();
  const param = useParams();
  const form_id = param["form_id"];

  const { data, isFetching } = useQuery({
    queryKey: ["form", form_id],
    queryFn: () => getFormById(form_id || ""),
  });
  if (isFetching) {
    return <LoadingComponent />;
  }
  return (
    <>
      <BuilderContext.Provider
        value={{
          blocks: Array.isArray(data?.data?.json_blocks)
            ? data?.data?.json_blocks
            : [],
          formData: data?.data || null,

          setBlocks: () => {},
          setFormData: () => {},
        }}
      >
        <div className="flex h-full w-full flex-grow flex-col">
          <BuilderForm />
        </div>
      </BuilderContext.Provider>
    </>
  );
};

export default FormBuilderPage;

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent";
import NotFoundComponent from "../components/NotFoundComponent";
import { PAGE_NAME } from "../constants/routerIndex";
import FormResponseManagement from "../features/form-response/FormResponseManagement";
import { useDynamicTitle, useScrollTop } from "../hooks";
import { getFormById } from "../services";

const FormBuilderResponsePage: React.FC = () => {
  useDynamicTitle(PAGE_NAME.FORM_BUILDER_RESPONSE);
  useScrollTop();
  const params = useParams<{ form_id: string }>();
  const form_id = params.form_id;
  const { data, isFetching } = useQuery({
    queryKey: ["getFormById", form_id],
    queryFn: async () => getFormById(form_id || ""),
    enabled: !!form_id,
    refetchOnWindowFocus: false,
  });
  if (isFetching) return <LoadingComponent />;
  return (
    <>
      {data?.data ? (
        <div className="flex min-h-[calc(100vh-70px)] w-full flex-grow flex-col bg-[#e3e8ec] p-2">
          <FormResponseManagement formResponse={data.data} />
        </div>
      ) : (
        <NotFoundComponent />
      )}
    </>
  );
};

export default FormBuilderResponsePage;

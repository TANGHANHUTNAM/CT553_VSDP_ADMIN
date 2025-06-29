import { useParams } from "react-router-dom";
import { PAGE_NAME } from "../constants/routerIndex";
import FormStatisticManagement from "../features/form-statistic/FormStatisticManagement";
import { useDynamicTitle, useScrollTop } from "../hooks";
import { useQuery } from "@tanstack/react-query";
import { getFormById } from "../services";
import NotFoundComponent from "../components/NotFoundComponent";
import LoadingComponent from "../components/LoadingComponent";

const FormBuilderStatisticsPage: React.FC = () => {
  useDynamicTitle(PAGE_NAME.FORM_BUILDER_STATISTICS);
  useScrollTop();
  const { form_id } = useParams<{ form_id: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ["form_stats_by_id", form_id],
    queryFn: () => getFormById(form_id as string),
    enabled: !!form_id,
  });
  if (isLoading) return <LoadingComponent />;
  return (
    <>
      {data?.data ? (
        <div className="flex min-h-[calc(100vh-70px)] w-full flex-grow flex-col bg-[#e3e8ec] p-2">
          <FormStatisticManagement
            name={data?.data?.name}
            created_at={data?.data?.created_at}
            scope={data?.data?.scope as string}
          />
        </div>
      ) : (
        <NotFoundComponent />
      )}
    </>
  );
};

export default FormBuilderStatisticsPage;

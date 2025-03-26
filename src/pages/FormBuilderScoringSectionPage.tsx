import { useParams } from "react-router-dom";
import { PAGE_NAME } from "../constants/routerIndex";
import ScoringSectionManagement from "../features/form-scoring-section/ScoringSectionManagement";
import { useDynamicTitle, useScrollTop } from "../hooks";
import { useQuery } from "@tanstack/react-query";
import { getAllScoringSectionsByFormIdService } from "../services/form-scoring-sections/form-scoring-sections-service";
import LoadingComponent from "../components/LoadingComponent";
import NotFoundComponent from "../components/NotFoundComponent";

const FormBuilderScoringSectionPage: React.FC = () => {
  useDynamicTitle(PAGE_NAME.FORM_BUILDER_SCORING_SECTION_SCHOLARSHIP);
  useScrollTop();
  const params = useParams<{ form_id: string }>();
  const form_id = params.form_id;
  const { data, isLoading } = useQuery({
    queryKey: ["scoring-sections", form_id],
    queryFn: async () =>
      getAllScoringSectionsByFormIdService(form_id as string),
    enabled: !!form_id,
  });
  if (isLoading) return <LoadingComponent />;
  return (
    <>
      {data?.data ? (
        <div className="flex min-h-[calc(100vh-70px)] w-full flex-grow flex-col bg-[#e3e8ec] p-2">
          <ScoringSectionManagement formData={data?.data} />
        </div>
      ) : (
        <NotFoundComponent />
      )}
    </>
  );
};

export default FormBuilderScoringSectionPage;

import { PAGE_NAME } from "../constants/routerIndex";
import DetailProcessScoringManagement from "../features/process-scoring/DetailProcessScoringManagement";
import { useDynamicTitle, useScrollTop } from "../hooks";

const FormBuilderScoringScholarship: React.FC = () => {
  useDynamicTitle(PAGE_NAME.FORM_BUILDER_SCORING_RESPONSE);
  useScrollTop();
  return (
    <div className="flex min-h-[calc(100vh-70px)] w-full flex-grow flex-col bg-[#e3e8ec] p-2">
      <DetailProcessScoringManagement />
    </div>
  );
};

export default FormBuilderScoringScholarship;

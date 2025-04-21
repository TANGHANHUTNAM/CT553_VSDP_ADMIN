import { PAGE_NAME } from "../constants/routerIndex";
import FormFilterResponseManagement from "../features/form-filter-response/FormFilterResponseManagement";
import { useDynamicTitle, useScrollTop } from "../hooks";

const FormBuilderFilterResponsePage: React.FC = () => {
  useDynamicTitle(PAGE_NAME.FORM_BUILDER_FILTER_RESPONSE);
  useScrollTop();
  return (
    <div className="flex min-h-[calc(100vh-70px)] w-full flex-grow flex-col bg-[#e3e8ec] p-2">
      <FormFilterResponseManagement />
    </div>
  );
};

export default FormBuilderFilterResponsePage;

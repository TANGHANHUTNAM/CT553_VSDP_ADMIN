import { PAGE_NAME } from "../constants/routerIndex";
import FormAssignmentManagement from "../features/form-assignment/FormAssignmentManagement";
import { useDynamicTitle, useScrollTop } from "../hooks";

const FormBuilderAssignmentPage: React.FC = () => {
  useDynamicTitle(PAGE_NAME.FORM_BUILDER_ASSIGEMENT_SCHOLARSHIP);
  useScrollTop();
  return (
    <div className="flex min-h-[calc(100vh-70px)] w-full flex-grow flex-col bg-[#e3e8ec] p-2">
      <FormAssignmentManagement />
    </div>
  );
};

export default FormBuilderAssignmentPage;

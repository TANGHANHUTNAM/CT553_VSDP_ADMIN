import { PAGE_NAME } from "../constants/routerIndex";
import FormManangement from "../features/form/FormManangement";
import { useDynamicTitle, useScrollTop } from "../hooks";
import LayoutPage from "../layout/LayoutPage";

const FormPage: React.FC = () => {
  useDynamicTitle(PAGE_NAME.FORM);
  useScrollTop();
  return (
    <LayoutPage>
      <FormManangement />
    </LayoutPage>
  );
};

export default FormPage;

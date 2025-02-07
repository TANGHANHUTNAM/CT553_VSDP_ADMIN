import { PAGE_NAME } from "../constants/routerIndex";
import { useDynamicTitle, useScrollTop } from "../hooks";

const FormFieldPage: React.FC = () => {
  useDynamicTitle(PAGE_NAME.FORM_FIELD);
  useScrollTop();
  return <div>FormFieldPage</div>;
};

export default FormFieldPage;

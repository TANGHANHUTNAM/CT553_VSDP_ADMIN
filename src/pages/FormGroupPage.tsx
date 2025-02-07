import { PAGE_NAME } from "../constants/routerIndex";
import { useDynamicTitle, useScrollTop } from "../hooks";

const FormGroupPage: React.FC = () => {
  useDynamicTitle(PAGE_NAME.FORM_GROUP);
  useScrollTop();
  return <div>FormGroupPage</div>;
};

export default FormGroupPage;

import { PAGE_NAME } from "../constants/routerIndex";
import { useDynamicTitle, useScrollTop } from "../hooks";

const FormVersionPage: React.FC = () => {
  useDynamicTitle(PAGE_NAME.FORM_VERSION);
  useScrollTop();
  return <div>FormVersionPage</div>;
};

export default FormVersionPage;

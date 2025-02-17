import { FormBlockInstance, FormBlocks } from "../../interfaces/form-block";

const ChildFormComponentWrapper = ({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) => {
  const FormComponent = FormBlocks[blockInstance.blockType]?.formComponent;
  if (!FormComponent) return null;
  return <FormComponent blockInstance={blockInstance} />;
};

export default ChildFormComponentWrapper;

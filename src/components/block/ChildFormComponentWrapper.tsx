import { FormInstance } from "antd";
import { FormBlockInstance, FormBlocks } from "../../interfaces/form-block";

const ChildFormComponentWrapper = ({
  blockInstance,
  primary_color,
  block_color,
  form,
}: {
  blockInstance: FormBlockInstance;
  primary_color: string;
  block_color: string;
  form: FormInstance;
}) => {
  const FormComponent = FormBlocks[blockInstance.blockType]?.formComponent;
  if (!FormComponent) return null;
  return (
    <FormComponent
      blockInstance={blockInstance}
      primary_color={primary_color}
      block_color={block_color}
      form={form}
    />
  );
};

export default ChildFormComponentWrapper;

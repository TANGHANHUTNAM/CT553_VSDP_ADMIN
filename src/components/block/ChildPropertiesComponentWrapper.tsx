import { FormBlockInstance, FormBlocks } from "../../interfaces/form-block";

const ChildPropertiesComponentWrapper = ({
  index,
  parentId,
  blockInstance,
}: {
  index: number;
  parentId: string;
  blockInstance: FormBlockInstance;
}) => {
  const PropertiesComponent =
    FormBlocks[blockInstance.blockType]?.propertiesComponent;
  if (!PropertiesComponent) return null;

  return (
    <>
      <PropertiesComponent
        blockInstance={blockInstance}
        positionIndex={index}
        parentId={parentId}
      />
    </>
  );
};

export default ChildPropertiesComponentWrapper;

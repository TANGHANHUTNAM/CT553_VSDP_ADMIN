import { FormBlockInstance } from "../../../interfaces/form-block";
import ChildPropertiesComponentWrapper from "../ChildPropertiesComponentWrapper";

const RowLayoutPropertiesComponent = ({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) => {
  const childBlocks = blockInstance.childBlock || [];

  return (
    <div className="w-full">
      <div className="flex w-full flex-col items-center justify-start">
        {childBlocks?.map((childBlock, index) => (
          <div
            key={childBlock.id}
            className="flex h-auto w-full items-center justify-center gap-1"
          >
            <ChildPropertiesComponentWrapper
              index={index + 1}
              parentId={blockInstance.id}
              blockInstance={childBlock}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RowLayoutPropertiesComponent;

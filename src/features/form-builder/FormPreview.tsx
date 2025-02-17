import { useContext } from "react";
import { BuilderContext } from "../../context/form-builder/BuilderContext";
import { FormBlocks } from "../../interfaces/form-block";

const FormPreview: React.FC = () => {
  const { blocksLayout } = useContext(BuilderContext);
  return (
    <div className={`min-h-[calc(100vh-140px)] bg-blue-50 py-4 scrollbar-thin`}>
      <div className="mx-auto flex h-full w-full max-w-3xl flex-col items-center space-y-4 rounded-md">
        <div className="h-[135px] w-full rounded-lg bg-[url('./assets/1200x300.png')] bg-cover bg-center bg-no-repeat" />
        {blocksLayout.length > 0 && (
          <div className="flex w-full flex-col gap-4">
            {blocksLayout.map((blockLayout) => {
              const FormBlockComponent =
                FormBlocks[blockLayout.blockType].formComponent;
              return (
                <FormBlockComponent
                  key={blockLayout.id}
                  blockInstance={blockLayout}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormPreview;

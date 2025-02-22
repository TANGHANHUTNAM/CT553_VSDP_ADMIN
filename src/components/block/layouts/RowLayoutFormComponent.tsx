import { Card } from "antd";
import { FormBlockInstance } from "../../../interfaces/form-block";
import Border from "./Border";
import ChildFormComponentWrapper from "../ChildFormComponentWrapper";
import { BuilderContext } from "../../../context/form-builder/BuilderContext";
import { useContext } from "react";

const RowLayoutFormComponent = ({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) => {
  const { blockColor } = useContext(BuilderContext);
  const childBlocks = blockInstance.childBlock || [];
  return (
    <div className="max-w-full">
      {blockInstance.isLocked && <Border />}
      <Card
        className={`relative w-full max-w-3xl`}
        style={{
          backgroundColor: blockColor,
          borderRadius: "0.5rem",
          minHeight: "128px",
          borderTopLeftRadius: blockInstance.isLocked ? 0 : "0.5rem",
          borderTopRightRadius: blockInstance.isLocked ? 0 : "0.5rem",
        }}
        styles={{
          body: {
            padding: "4px",
          },
        }}
      >
        <div className="px-1">
          <div className="flex flex-wrap gap-2">
            <div className="flex w-full flex-col items-center justify-center gap-3 px-5 py-6">
              {childBlocks.map((childBlock) => (
                <div
                  key={childBlock.id}
                  className="flex h-auto w-full items-center justify-center gap-1"
                >
                  <ChildFormComponentWrapper blockInstance={childBlock} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RowLayoutFormComponent;

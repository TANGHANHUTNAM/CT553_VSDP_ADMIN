import { Card } from "antd";
import { FormBlockInstance } from "../../../interfaces/form-block";
import Border from "./Border";
import ChildFormComponentWrapper from "../ChildFormComponentWrapper";

const RowLayoutFormComponent = ({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) => {
  const childBlocks = blockInstance.childBlock || [];
  return (
    <div className="max-w-full">
      {blockInstance.isLocked && <Border />}
      <Card
        className={`relative min-h-32 w-full max-w-3xl ${blockInstance.isLocked ? "rounded-t-none" : ""} rounded-lg border-2 border-gray-200 bg-white`}
        style={{
          padding: "4px",
        }}
        styles={{
          body: {
            padding: "0px",
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

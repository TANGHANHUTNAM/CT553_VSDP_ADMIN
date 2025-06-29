import { Card, FormInstance } from "antd";
import { FormBlockInstance } from "../../../interfaces/form-block";
import Border from "./Border";
import ChildFormComponentWrapper from "../ChildFormComponentWrapper";
import { BuilderContext } from "../../../context/form-builder/BuilderContext";
import { useContext } from "react";

const RowLayoutFormComponent = ({
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
  const { blockColor } = useContext(BuilderContext);
  const childBlocks = blockInstance.childBlock || [];
  return (
    <div className="max-w-full">
      {blockInstance.isLocked && <Border color={primary_color as string} />}
      <Card
        className={`relative w-full max-w-3xl`}
        style={{
          backgroundColor: blockColor || block_color,
          borderRadius: "0.5rem",
          minHeight: "128px",
          borderTopLeftRadius: blockInstance.isLocked ? 0 : "0.5rem",
          borderTopRightRadius: blockInstance.isLocked ? 0 : "0.5rem",
          border: 0,
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
                  <ChildFormComponentWrapper
                    blockInstance={childBlock}
                    primary_color={primary_color as string}
                    block_color={block_color as string}
                    form={form}
                  />
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

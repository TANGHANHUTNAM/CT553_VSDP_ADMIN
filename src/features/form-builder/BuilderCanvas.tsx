import { Active, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { useContext, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { ALL_LAYOUT } from "../../constants/blockLayout";
import { BuilderContext } from "../../context/form-builder/BuilderContext";
import {
  FormBlockInstance,
  FormBlocks,
  FormBlockType,
} from "../../interfaces/form-block";
import { generateUniqueId } from "../../utils/functionUtils";
import { Card, Form } from "antd";

const BuilderCanvas = () => {
  const {
    blocksLayout,
    setBlocksLayout,
    repositionBlockLayout,
    insertBlockLayoutAtIndex,
    backgroundColor,
    selectedSection,
    imge_url,
    blockColor,
    primaryColor,
  } = useContext(BuilderContext);
  const [activeBlock, setActiveBlock] = useState<Active | null>(null);
  const droppable = useDroppable({
    id: "builder-canvas-droppable",
    data: {
      isBuilderCanvasDropArea: true,
    },
  });

  useDndMonitor({
    onDragStart: (event) => {
      console.log("onDragStart", event);
      setActiveBlock(event.active);
    },
    onDragEnd: (event) => {
      console.log("onDragEnd", event);
      const { active, over } = event;
      if (!active || !over) return;
      setActiveBlock(null);
      const isBlockBtnElement = active?.data?.current?.isBlockBtnElement;
      const isBlockLayout = active?.data?.current?.blockType;
      const isDraggingOverCanvas = over?.data?.current?.isBuilderCanvasDropArea;
      if (
        isBlockBtnElement &&
        ALL_LAYOUT.includes(isBlockLayout) &&
        isDraggingOverCanvas
      ) {
        const blockType = active?.data?.current?.blockType;
        const newBlockLayout =
          FormBlocks[blockType as FormBlockType].createInstance(
            generateUniqueId(),
          );
        setBlocksLayout((prev) => [...prev, newBlockLayout]);
        return;
      }
      const isDroppingOverCanvasBlockLayoutAbove = over?.data?.current?.isAbove;
      const isDroppingOverCanvasBlockLayoutBelow = over?.data?.current?.isBelow;

      const isDroppingOverCanvasLayout =
        isDroppingOverCanvasBlockLayoutAbove ||
        isDroppingOverCanvasBlockLayoutBelow;

      const droppingLayoutBlockOverCanvas =
        isBlockBtnElement &&
        ALL_LAYOUT.includes(isBlockLayout) &&
        isDroppingOverCanvasLayout;
      if (droppingLayoutBlockOverCanvas) {
        const blockType = active?.data?.current?.blockType;
        const overId = over?.data?.current?.blockId;
        const newBlockLayout =
          FormBlocks[blockType as FormBlockType].createInstance(
            generateUniqueId(),
          );
        let position: "above" | "below" = "below";
        if (isDroppingOverCanvasBlockLayoutAbove) {
          position = "above";
        }
        insertBlockLayoutAtIndex(overId, newBlockLayout, position);
        return;
      }

      const isDraggingCanvasLayout = active?.data?.current?.isCanvasLayout;
      const draggingCanvasLayoutOverAnotherLayout =
        isDroppingOverCanvasLayout && isDraggingCanvasLayout;
      if (draggingCanvasLayoutOverAnotherLayout) {
        const activeId = active?.data?.current?.blockId;
        const overId = over?.data?.current?.blockId;
        let position: "above" | "below" = "below";
        if (isDroppingOverCanvasBlockLayoutAbove) {
          position = "above";
        }
        repositionBlockLayout(activeId, overId, position);
        return;
      }
    },
    onDragCancel: () => {
      setActiveBlock(null);
    },
  });

  const [form] = Form.useForm();
  return (
    <div
      ref={droppable.setNodeRef}
      style={{ backgroundColor }}
      className={`mx-3 min-h-[calc(100vh-140px)] rounded-lg p-3 ring-1 ring-primary scrollbar-thin ${droppable.isOver ? "ring-2" : ""}`}
    >
      <div className="mx-auto flex h-full w-full max-w-screen-sm flex-col items-center">
        {!selectedSection && (
          <div className="flex min-h-[calc(100vh-200px)] w-full flex-col items-center justify-center font-medium text-black">
            <CiEdit className="text-3xl" /> Chọn phần biểu mẫu để chỉnh sửa
          </div>
        )}
        {selectedSection && (
          <>
            <div
              style={{
                backgroundImage: `url(${imge_url})`,
              }}
              className={`h-[135px] w-full rounded-md bg-gray-300 bg-cover bg-center bg-no-repeat`}
            />
            {selectedSection && (
              <div className="mt-4 w-full max-w-full">
                <div
                  style={{
                    backgroundColor: primaryColor,
                  }}
                  className="min-h-[24px] w-full rounded-t-lg px-5"
                >
                  <div className="py-2 text-lg font-medium uppercase">
                    {selectedSection?.name}
                  </div>
                </div>
                <Card
                  className={`relative w-full max-w-3xl cursor-default shadow-sm`}
                  style={{
                    backgroundColor: blockColor,
                    borderRadius: "0.5rem",
                    borderTopLeftRadius: "0",
                    borderTopRightRadius: "0",
                    minHeight: "128px",
                    border: 0,
                  }}
                  styles={{
                    body: {
                      padding: "4px",
                    },
                  }}
                >
                  {/* Content */}
                  <div className="px-5 py-5">
                    <p className="flex flex-wrap gap-2 font-medium">
                      {selectedSection?.description}
                    </p>
                  </div>
                </Card>
              </div>
            )}
            {blocksLayout.length > 0 && (
              <Form
                form={form}
                className="w-full"
                layout="vertical"
                validateTrigger={["onChange", "onBlur"]}
              >
                <div className="mt-4 flex h-full w-full flex-col gap-4">
                  {blocksLayout?.map((blockLayout) => (
                    <CanvasBlockLayoutWrapper
                      key={blockLayout.id}
                      blockLayout={blockLayout}
                      activeBlock={activeBlock}
                    />
                  ))}
                </div>
              </Form>
            )}
          </>
        )}
      </div>
    </div>
  );
};

function CanvasBlockLayoutWrapper({
  blockLayout,
  activeBlock,
}: {
  blockLayout: FormBlockInstance;
  activeBlock: Active | null;
}) {
  const CanvasBlockLayout = FormBlocks[blockLayout.blockType].canvasComponent;
  const topCorner = useDroppable({
    id: blockLayout.id + "_above",
    data: {
      blockType: blockLayout.blockType,
      blockId: blockLayout.id,
      isAbove: true,
    },
  });
  const bottomCorner = useDroppable({
    id: blockLayout.id + "_below",
    data: {
      blockType: blockLayout.blockType,
      blockId: blockLayout.id,
      isBelow: true,
    },
  });
  const { primaryColor } = useContext(BuilderContext);
  return (
    <div className="relative">
      {/* Top */}
      {ALL_LAYOUT.includes(activeBlock?.data?.current?.blockType) &&
        !blockLayout.isLocked && (
          <div
            ref={topCorner.setNodeRef}
            className="pointer-events-none absolute top-0 h-1/2 w-full"
          >
            {topCorner.isOver && (
              <div
                style={{
                  backgroundColor: primaryColor,
                }}
                className="absolute -top-0.5 h-[12px] w-full rounded-t-3xl"
              />
            )}
          </div>
        )}
      {/* Bottom */}
      {!blockLayout.isLocked &&
        ALL_LAYOUT.includes(activeBlock?.data?.current?.blockType) && (
          <div
            ref={bottomCorner.setNodeRef}
            className="pointer-events-none absolute bottom-0 h-1/2 w-full"
          >
            {bottomCorner.isOver && (
              <div
                style={{
                  backgroundColor: primaryColor,
                }}
                className="absolute -bottom-0.5 h-[12px] w-full rounded-b-3xl"
              />
            )}
          </div>
        )}
      <CanvasBlockLayout blockInstance={blockLayout} />
    </div>
  );
}

export default BuilderCanvas;

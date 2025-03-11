import { useContext, useState } from "react";
import {
  FormBlockInstance,
  FormBlocks,
  FormBlockType,
} from "../../../interfaces/form-block";
import { BuilderContext } from "../../../context/form-builder/BuilderContext";
import {
  Active,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { ALL_LAYOUT } from "../../../constants/blockLayout";
import { generateUniqueId } from "../../../utils/functionUtils";
import Border from "./Border";
import { Card } from "antd";
import { BsGrid3X2Gap } from "react-icons/bs";
import PlaceHolder from "./PlaceHolder";
import ChildCanvasComponentWrapper from "../ChildCanvasComponentWrapper";
import { IoClose } from "react-icons/io5";
import ButtonComponent from "../../ButtonComponent";
import { FaRegCopy } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GoLock, GoUnlock } from "react-icons/go";

const RowLayoutCanvasComponent = ({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) => {
  const childBlock = blockInstance.childBlock || [];
  const {
    removeBlockLayout,
    duplicateBlockLayout,
    handleSelectedBlockLayout,
    selectedBlockLayout,
    updatedBlockLayouts,
    lockBlockLayout,
    unlockBlockLayout,
    blockColor,
    primaryColor,
    formData,
  } = useContext(BuilderContext);

  const [activeBlock, setActiveBlock] = useState<Active | null>(null);

  const droppable = useDroppable({
    id: blockInstance.id,
    disabled: blockInstance.isLocked,
    data: {
      isLayoutDropArea: true,
    },
  });
  const isSelected = selectedBlockLayout?.id === blockInstance.id;
  const draggable = useDraggable({
    id: blockInstance.id + "_drag-area",
    disabled: blockInstance.isLocked,
    data: {
      blockType: blockInstance.blockType,
      blockId: blockInstance.id,
      isCanvasLayout: true,
    },
  });

  useDndMonitor({
    onDragStart: (event) => {
      setActiveBlock(event.active);
    },
    onDragEnd: (event) => {
      const { active, over } = event;
      if (!active || !over) return;
      setActiveBlock(null);
      const isBlockBtnElement = active?.data?.current?.isBlockBtnElement;
      const isLayout = active?.data?.current?.blockType;
      const overBlockId = over?.id;
      if (
        isBlockBtnElement &&
        !ALL_LAYOUT.includes(isLayout) &&
        overBlockId === blockInstance.id
      ) {
        const blockType = active?.data?.current?.blockType;
        const newBlock =
          FormBlocks[blockType as FormBlockType].createInstance(
            generateUniqueId(),
          );
        const updatedChildrenBlock = [...childBlock, newBlock];
        updatedBlockLayouts(blockInstance.id, updatedChildrenBlock);
        return;
      }
    },
  });

  function removeChildBlock(e: { stopPropagation: () => void }, id: string) {
    e.stopPropagation();
    const filterdBlock = childBlock.filter((block) => block.id !== id);
    updatedBlockLayouts(blockInstance.id, filterdBlock);
  }
  if (draggable.isDragging) {
    return;
  }

  return (
    <div ref={draggable.setNodeRef} className="max-w-full">
      {blockInstance.isLocked && (
        <Border color={formData?.primary_color as string} />
      )}
      <Card
        ref={droppable.setNodeRef}
        onClick={() => handleSelectedBlockLayout(blockInstance)}
        className={`relative w-full max-w-3xl shadow-sm hover:cursor-pointer`}
        style={{
          backgroundColor: blockColor,
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
        {/* Content */}
        <div className="px-2 pb-2">
          {isSelected && !blockInstance.isLocked && (
            <div
              style={{
                backgroundColor: primaryColor,
              }}
              className="absolute -left-[1px] top-0 h-full w-[10px] rounded-l-lg"
            ></div>
          )}
          {!blockInstance.isLocked && !formData?.is_public && (
            <div
              {...draggable.listeners}
              {...draggable.attributes}
              role="button"
              className="flex h-[18px] w-full cursor-move items-center justify-center"
            >
              <BsGrid3X2Gap
                style={{
                  color: primaryColor,
                }}
                className="text-lg"
              />
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {droppable.isOver &&
              !blockInstance.isLocked &&
              activeBlock?.data?.current?.isBlockBtnElement &&
              !ALL_LAYOUT.includes(activeBlock?.data?.current?.blockType) && (
                <div
                  style={
                    {
                      borderColor: primaryColor,
                      backgroundColor: primaryColor + "33",
                      "--hover-color": primaryColor + "66",
                    } as React.CSSProperties
                  }
                  className="relative h-28 w-full border border-dotted"
                >
                  <div
                    style={{
                      backgroundColor: primaryColor,
                    }}
                    className="absolute left-1/2 top-0 w-28 -translate-x-1/2 rounded-b-full p-1 text-center text-xs text-white shadow-md"
                  >
                    Thả vào đây
                  </div>
                </div>
              )}
            {!droppable.isOver && childBlock?.length === 0 ? (
              <PlaceHolder />
            ) : (
              <div className="flex w-full flex-col items-center justify-center gap-3 px-3 py-4">
                {childBlock?.map((childBlock) => (
                  <div
                    key={childBlock?.id}
                    className="flex w-full items-center justify-center gap-1"
                  >
                    <ChildCanvasComponentWrapper blockInstance={childBlock} />
                    {isSelected &&
                      !blockInstance.isLocked &&
                      !formData?.is_public && (
                        <button
                          className="p-1"
                          onClick={(e) => {
                            removeChildBlock(e, childBlock.id);
                          }}
                        >
                          <IoClose className="text-base" />
                        </button>
                      )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* footer */}
        {isSelected && !blockInstance.isLocked && (
          <div className="flex items-center justify-end gap-3 border-t px-1 py-2">
            <ButtonComponent
              disabled={formData?.is_public}
              onclick={(e) => {
                e.stopPropagation();
                lockBlockLayout(blockInstance.id);
              }}
              type="default"
              size="middle"
              textTooltip="Khóa"
              icon={<GoLock className="text-lg" />}
              text=""
            />
            <ButtonComponent
              disabled={formData?.is_public}
              onclick={(e) => {
                e.stopPropagation();
                duplicateBlockLayout(blockInstance.id);
              }}
              type="default"
              size="middle"
              textTooltip="Sao chép"
              icon={<FaRegCopy className="text-lg" />}
              text=""
            />
            <ButtonComponent
              disabled={formData?.is_public}
              onclick={(e) => {
                e.stopPropagation();
                removeBlockLayout(blockInstance.id);
              }}
              text=""
              size="middle"
              textTooltip="Xóa"
              type="default"
              icon={<RiDeleteBin6Line className="text-lg" />}
            />
          </div>
        )}
        {blockInstance.isLocked && (
          <div className="flex items-center justify-end gap-3 px-1 py-2">
            <ButtonComponent
              onclick={(e) => {
                e.stopPropagation();
                unlockBlockLayout(blockInstance.id);
              }}
              type="default"
              size="middle"
              textTooltip="Mở khóa"
              icon={<GoUnlock className="text-lg" />}
              text=""
              disabled={formData?.is_public}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default RowLayoutCanvasComponent;

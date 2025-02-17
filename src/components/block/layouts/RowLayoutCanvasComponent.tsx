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
      {blockInstance.isLocked && <Border />}

      <Card
        ref={droppable.setNodeRef}
        onClick={() => handleSelectedBlockLayout(blockInstance)}
        className={`relative min-h-40 w-full max-w-3xl border border-dashed border-primary shadow-sm hover:cursor-pointer`}
        style={{
          padding: "4px",
        }}
        styles={{
          body: {
            padding: "0px",
          },
        }}
      >
        {/* Content */}

        <div className="px-2 pb-2">
          {isSelected && !blockInstance.isLocked && (
            <div className="absolute -left-1 top-0 h-full w-[6px] rounded-l-md bg-primary"></div>
          )}
          {!blockInstance.isLocked && (
            <div
              {...draggable.listeners}
              {...draggable.attributes}
              role="button"
              className="mb-1 flex h-[18px] w-full cursor-move items-center justify-center"
            >
              <BsGrid3X2Gap className="text-lg text-gray-400" />
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {droppable.isOver &&
              !blockInstance.isLocked &&
              activeBlock?.data?.current?.isBlockBtnElement &&
              !ALL_LAYOUT.includes(activeBlock?.data?.current?.blockType) && (
                <div className="relative h-28 w-full border border-dotted border-primary bg-primary/10 hover:bg-primary/5">
                  <div className="absolute left-1/2 top-0 w-28 -translate-x-1/2 rounded-b-full bg-primary p-1 text-center text-xs text-white shadow-md">
                    Drop here
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
                    {isSelected && !blockInstance.isLocked && (
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
      </Card>
    </div>
  );
};

export default RowLayoutCanvasComponent;

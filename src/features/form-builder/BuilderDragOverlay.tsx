import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useContext, useState } from "react";
import BlockBtnDragOverlay from "../../components/block/BlockBtnDragOverlay";
import { BuilderContext } from "../../context/form-builder/BuilderContext";
import { FormBlocks, FormBlockType } from "../../interfaces/form-block";
import { BsGrid3X2Gap } from "react-icons/bs";

const BuilderDragOverlay = () => {
  const { blocksLayout, primaryColor } = useContext(BuilderContext);
  const [draggeItem, setDraggedItem] = useState<Active | null>(null);
  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel() {
      setDraggedItem(null);
    },
    onDragEnd() {
      setDraggedItem(null);
    },
  });
  let fallback = <div>Không có khối nào</div>;
  if (!draggeItem) return null;

  const isBlockBtnElement = draggeItem?.data?.current?.isBlockBtnElement;
  const isCanvasLayout = draggeItem?.data?.current?.isCanvasLayout;

  if (isBlockBtnElement) {
    const blockType = draggeItem?.data?.current?.blockType as FormBlockType;
    fallback = <BlockBtnDragOverlay formBlock={FormBlocks[blockType]} />;
  }
  if (isCanvasLayout) {
    const blockId = draggeItem?.data?.current?.blockId;

    const blockLayout = blocksLayout?.find((block) => block.id === blockId);
    if (!blockLayout) {
      fallback = <div>Không có khối nào</div>;
    } else {
      // const CanvasComponent = FormBlocks[blockLayout.blockType].canvasComponent;
      fallback = (
        <div
          style={{
            color: primaryColor,
            backgroundColor: primaryColor + "10",
            border: `3px dashed ${primaryColor}`,
          }}
          className={`relative flex min-h-28 cursor-pointer items-center justify-center space-x-1.5 rounded-sm bg-gray-100 p-1.5 text-sm`}
        >
          <div className="absolute top-1 cursor-move">
            <BsGrid3X2Gap className="text-lg" />
          </div>
          {/* <CanvasComponent blockInstance={blockLayout} /> */}
          <span className="text-lg font-bold">{blockLayout.blockType}</span>
        </div>
      );
    }
  }
  return (
    <DragOverlay>
      <div className="cursor-move opacity-80">{fallback}</div>
    </DragOverlay>
  );
};

export default BuilderDragOverlay;

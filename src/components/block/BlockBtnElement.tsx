import { useDraggable } from "@dnd-kit/core";
import { ObjectBlockType } from "../../interfaces/form-block";

const BlockBtnElement = ({
  formBlock,
  disabled,
}: {
  formBlock: ObjectBlockType;
  disabled?: boolean;
}) => {
  const { icon: Icon, label } = formBlock.blockBtnElement;
  const draggable = useDraggable({
    id: `block-btn-${formBlock.blockType}`,
    disabled: disabled,
    data: {
      blockType: formBlock.blockType,
      isBlockBtnElement: true,
    },
  });
  return (
    <button
      ref={draggable.setNodeRef}
      className={`flex cursor-pointer items-center space-x-1.5 rounded-md bg-gray-100 p-1.5 text-sm ring-1 ring-gray-300 hover:ring-primary ${draggable.isDragging ? "cursor-pointer shadow-xl ring-2 ring-primary" : ""}`}
      disabled={disabled}
      {...draggable.attributes}
      {...draggable.listeners}
    >
      <Icon />
      <span>{label}</span>
    </button>
  );
};

export default BlockBtnElement;

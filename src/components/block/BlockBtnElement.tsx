import { useDraggable } from "@dnd-kit/core";
import { ObjectBlockType } from "../../interfaces/form-block";
import { useContext } from "react";
import { BuilderContext } from "../../context/form-builder/BuilderContext";

const BlockBtnElement = ({
  formBlock,
  disabled,
}: {
  formBlock: ObjectBlockType;
  disabled?: boolean;
}) => {
  const { formData } = useContext(BuilderContext);
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
      className={`flex ${formData?.is_public && "cursor-not-allowed"} cursor-pointer items-center space-x-1.5 rounded-sm bg-gray-100 p-1.5 text-sm font-light text-gray-700 ring-1 ring-gray-300 hover:ring-primary ${draggable.isDragging ? "cursor-pointer shadow-xl ring-2 ring-primary" : ""}`}
      disabled={disabled || formData?.is_public}
      {...draggable.attributes}
      {...draggable.listeners}
    >
      <Icon />
      <span>{label}</span>
    </button>
  );
};

export default BlockBtnElement;

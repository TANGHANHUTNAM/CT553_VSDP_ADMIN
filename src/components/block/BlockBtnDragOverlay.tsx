import { ObjectBlockType } from "../../interfaces/form-block";

const BlockBtnDragOverlay = ({ formBlock }: { formBlock: ObjectBlockType }) => {
  const { icon: Icon, label } = formBlock.blockBtnElement;

  return (
    <button
      className={`flex w-full cursor-pointer items-center space-x-1.5 rounded-md bg-gray-50 p-1.5 text-sm ring-2 ring-primary/80`}
    >
      <Icon />
      <span>{label}</span>
    </button>
  );
};

export default BlockBtnDragOverlay;

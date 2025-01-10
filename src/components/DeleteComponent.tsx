import { Popconfirm, Tooltip } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoWarningSharp } from "react-icons/io5";
import { useRef } from "react";

interface IDeleteComponentProps {
  onConfirm?: () => void;
  titleTooltip?: string | React.ReactNode | undefined;
  titlePopconfirm?: string | React.ReactNode | undefined;
}

const DeleteComponent: React.FC<IDeleteComponentProps> = ({
  onConfirm,
  titleTooltip,
  titlePopconfirm = "Bạn có chắc muốn xóa?",
}) => {
  const deleteIconRef = useRef<HTMLDivElement>(null);
  return (
    <div className="cursor-pointer text-red-500">
      <Popconfirm
        title={titlePopconfirm}
        onConfirm={onConfirm}
        icon={<IoWarningSharp className="mr-1 text-lg text-yellow-400" />}
      >
        <Tooltip title={titleTooltip}>
          <div ref={deleteIconRef}>
            <RiDeleteBin6Line className="text-xl" />
          </div>
        </Tooltip>
      </Popconfirm>
    </div>
  );
};

export default DeleteComponent;

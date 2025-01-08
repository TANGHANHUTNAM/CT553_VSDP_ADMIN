import { Popconfirm, Tooltip } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoWarningSharp } from "react-icons/io5";

interface IDeleteComponentProps {
  onClick?: () => void;
  titleTooltip?: string | React.ReactNode | undefined;
  titlePopconfirm?: string | React.ReactNode | undefined;
}

const DeleteComponent: React.FC<IDeleteComponentProps> = ({
  onClick,
  titleTooltip,
  titlePopconfirm = "Bạn có chắc muốn xóa?",
}) => {
  return (
    <div className="cursor-pointer text-red-500">
      <Popconfirm
        title={titlePopconfirm}
        onConfirm={onClick}
        icon={<IoWarningSharp className="mr-1 text-lg text-yellow-400" />}
      >
        <Tooltip title={titleTooltip}>
          <RiDeleteBin6Line className="text-xl" />
        </Tooltip>
      </Popconfirm>
    </div>
  );
};

export default DeleteComponent;

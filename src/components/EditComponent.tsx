import { Tooltip } from "antd";
import { CiEdit } from "react-icons/ci";

interface IEditComponentProps {
  onClick?: () => void;
  titleTooltip?: string | React.ReactNode | undefined;
}

const EditComponent: React.FC<IEditComponentProps> = ({
  onClick,
  titleTooltip,
}) => {
  return (
    <div onClick={onClick} className="cursor-pointer text-yellow-500">
      <Tooltip title={titleTooltip}>
        <CiEdit className="text-2xl" />
      </Tooltip>
    </div>
  );
};

export default EditComponent;

import { Tooltip } from "antd";
import { FaEye } from "react-icons/fa";

interface IViewComponentProps {
  titleTooltip?: string | React.ReactNode | undefined;
  onClick?: () => void;
}

const ViewComponent: React.FC<IViewComponentProps> = ({
  titleTooltip,
  onClick,
}) => {
  return (
    <div onClick={onClick} className="cursor-pointer text-blue-500">
      <Tooltip title={titleTooltip}>
        <FaEye className="text-xl" />
      </Tooltip>
    </div>
  );
};

export default ViewComponent;

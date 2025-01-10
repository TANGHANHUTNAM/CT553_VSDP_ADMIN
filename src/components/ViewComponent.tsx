import { Tooltip } from "antd";
import { FaEye } from "react-icons/fa";
import React, { useRef } from "react";

interface IViewComponentProps {
  titleTooltip?: string | React.ReactNode | undefined;
  onClick?: () => void;
  icon?: React.ReactNode | undefined;
}

const ViewComponent: React.FC<IViewComponentProps> = ({
  titleTooltip,
  onClick,
  icon = <FaEye className="text-xl" />,
}) => {
  const eyeIconRef = useRef<HTMLDivElement>(null);

  return (
    <div onClick={onClick} className="cursor-pointer text-blue-500">
      <Tooltip title={titleTooltip}>
        <div ref={eyeIconRef}>{icon}</div>
      </Tooltip>
    </div>
  );
};

export default ViewComponent;

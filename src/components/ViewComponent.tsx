import { Tooltip } from "antd";
import { FaEye } from "react-icons/fa";
import React, { useRef } from "react";

interface IViewComponentProps {
  titleTooltip?: string | React.ReactNode | undefined;
  onClick?: () => void;
}

const ViewComponent: React.FC<IViewComponentProps> = ({
  titleTooltip,
  onClick,
}) => {
  const eyeIconRef = useRef<HTMLDivElement>(null);

  return (
    <div onClick={onClick} className="cursor-pointer text-blue-500">
      <Tooltip title={titleTooltip}>
        <div ref={eyeIconRef}>
          <FaEye className="text-xl" />
        </div>
      </Tooltip>
    </div>
  );
};

export default ViewComponent;

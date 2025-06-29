import { Tooltip } from "antd";
import { CiEdit } from "react-icons/ci";
import React, { useRef } from "react";

interface IEditComponentProps {
  onClick?: () => void;
  titleTooltip?: string | React.ReactNode | undefined;
}

const EditComponent: React.FC<IEditComponentProps> = ({
  onClick,
  titleTooltip,
}) => {
  const editIconRef = useRef<HTMLDivElement>(null);

  return (
    <div onClick={onClick} className="cursor-pointer text-yellow-500">
      <Tooltip title={titleTooltip}>
        <div ref={editIconRef}>
          <CiEdit className="text-2xl" />
        </div>
      </Tooltip>
    </div>
  );
};

export default EditComponent;

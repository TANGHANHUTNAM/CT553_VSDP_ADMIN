import { Button, Tooltip } from "antd";
import { BaseButtonProps } from "antd/es/button/button";

interface IButtonComponentProps {
  text: string;
  icon: React.ReactNode;
  type: BaseButtonProps["type"];
  className?: string;
  size: BaseButtonProps["size"];
  textTooltip: string;
  htmlType?: "button" | "submit" | "reset" | undefined;
  loading?: boolean;
  onclick?: () => void;
}

const ButtonComponent: React.FC<IButtonComponentProps> = ({
  text,
  icon,
  type = "primary",
  className,
  size,
  textTooltip = "",
  htmlType,
  loading,
  onclick,
}) => {
  return (
    <>
      <Tooltip title={textTooltip}>
        <Button
          type={type}
          icon={icon}
          size={size}
          className={className}
          htmlType={htmlType}
          loading={loading}
          onClick={onclick}
        >
          {text}
        </Button>
      </Tooltip>
    </>
  );
};

export default ButtonComponent;

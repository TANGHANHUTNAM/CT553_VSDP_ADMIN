import { Button } from "antd";
import { BaseButtonProps } from "antd/es/button/button";

interface IButtonComponentProps {
  text: string;
  icon: React.ReactNode;
  type: BaseButtonProps["type"];
  className?: string;
  size: BaseButtonProps["size"];
}

const ButtonComponent: React.FC<IButtonComponentProps> = ({
  text,
  icon,
  type = "primary",
  className,
  size,
}) => {
  return (
    <>
      <Button type={type} icon={icon} size={size} className={className}>
        {text}
      </Button>
    </>
  );
};

export default ButtonComponent;

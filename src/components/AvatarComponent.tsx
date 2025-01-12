import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
interface IAvatarComponentProps {
  size?: number;
  src?: string | null;
  alt?: string;
}

const AvatarComponent: React.FC<IAvatarComponentProps> = ({
  size = 40,
  src = null,
  alt = "avatar",
}) => {
  return (
    <>
      <Avatar
        src={src}
        size={size}
        icon={<UserOutlined className="" />}
        alt={alt}
      />
    </>
  );
};

export default AvatarComponent;

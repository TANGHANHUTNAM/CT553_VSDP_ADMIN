import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
interface IAvatarComponentProps {
  size?: number;
  src?: string | null;
}

const AvatarComponent: React.FC<IAvatarComponentProps> = ({
  size = 40,
  src = null,
}) => {
  return (
    <>
      <Avatar src={src} size={size} icon={<UserOutlined />} />
    </>
  );
};

export default AvatarComponent;

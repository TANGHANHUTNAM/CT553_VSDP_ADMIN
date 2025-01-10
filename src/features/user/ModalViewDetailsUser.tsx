import { Descriptions, Drawer, Tag } from "antd";
import { FaWindowClose } from "react-icons/fa";
import AvatarComponent from "../../components/AvatarComponent";
import { IUsersResponse } from "../../interfaces";
import { formatDate, formatDateTime } from "../../utils/functionUtils";

interface IModalViewDetailsUserProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  userData: IUsersResponse | null;
}

const ModalViewDetailsUser: React.FC<IModalViewDetailsUserProps> = ({
  open,
  setOpen,
  userData,
}) => {
  return (
    <>
      <Drawer
        closable
        closeIcon={<FaWindowClose className="text-2xl text-primary" />}
        size="large"
        destroyOnClose
        title={
          <div className="">{`Xem chi tiết người dùng ${userData?.email ? userData?.email : ""}`}</div>
        }
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Avatar">
            <AvatarComponent src={userData?.avatar || undefined} size={64} />
          </Descriptions.Item>
          <Descriptions.Item label="ID">
            {userData?.id || "Chưa cập nhật"}
          </Descriptions.Item>
          <Descriptions.Item label="Tên">
            {userData?.name || "Chưa cập nhật"}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {userData?.email || "Chưa cập nhật"}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng Thái Tài Khoản">
            {userData ? (
              <Tag color={userData.active ? "green" : "red"}>
                {userData.active ? "Hoạt động" : "Không hoạt động"}
              </Tag>
            ) : (
              "Chưa cập nhật"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Vai Trò">
            {userData?.role?.name || "Tên vai trò"} -{" "}
            {userData?.role?.description || "Mô tả vai trò"}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng Thái Vai Trò">
            {userData?.role ? (
              <Tag color={userData.role.active ? "green" : "red"}>
                {userData.role.active ? "Hoạt động" : "Không hoạt động"}
              </Tag>
            ) : (
              "Chưa cập nhật"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày Sinh">
            {formatDate(userData?.date_of_birth as string) || "Chưa cập nhật"}
          </Descriptions.Item>
          <Descriptions.Item label="Giới Tính">
            {userData?.gender || "Chưa cập nhật"}
          </Descriptions.Item>
          <Descriptions.Item label="Số Điện Thoại">
            {userData?.phone_number || "Chưa cập nhật"}
          </Descriptions.Item>

          <Descriptions.Item label="Thế Hệ">
            {userData?.generation || "Chưa cập nhật"}
          </Descriptions.Item>
          <Descriptions.Item label="Trường Học">
            {userData?.school || "Chưa cập nhật"}
          </Descriptions.Item>
          <Descriptions.Item label="Ngành Học">
            {userData?.major || "Chưa cập nhật"}
          </Descriptions.Item>
          <Descriptions.Item label="Công Ty">
            {userData?.company || "Chưa cập nhật"}
          </Descriptions.Item>
          <Descriptions.Item label="Khách Mời Bên Ngoài">
            {userData?.is_external_guest ? "Có" : "Không"}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày Tạo">
            {formatDateTime(userData?.created_at as string)}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày Cập Nhật">
            {formatDateTime(userData?.updated_at as string)}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};

export default ModalViewDetailsUser;

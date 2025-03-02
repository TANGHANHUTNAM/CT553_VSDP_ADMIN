import { useQuery } from "@tanstack/react-query";
import { Card, Col, Row, Tabs, Tag } from "antd";
import { getUserProfileService } from "../../services";
import { formatDate, formatGender } from "../../utils/functionUtils";
import ProfileDetails from "./ProfileDetails";
import UpdateProfile from "./UpdateProfile";
import UploadAvatar from "./UploadAvatar";

const ProfileManagement: React.FC = () => {
  const { data: dataUserProfile } = useQuery({
    queryKey: ["user", "profile"],
    queryFn: async () => {
      const response = await getUserProfileService();
      return response;
    },
  });

  const items = [
    {
      key: "1",
      label: "Chi tiết",
      children: (
        <ProfileDetails dataUserProfile={dataUserProfile?.data || null} />
      ),
    },
    {
      key: "2",
      label: "Cập nhật",
      children: (
        <UpdateProfile dataUserProfile={dataUserProfile?.data || null} />
      ),
    },
  ];

  return (
    <Card>
      <Row gutter={[16, 16]} align="middle">
        {/* Avatar */}

        <Col span={4} style={{ textAlign: "center" }}>
          <UploadAvatar dataUserProfile={dataUserProfile?.data || null} />
        </Col>

        {/* User Info */}
        <Col span={20}>
          <Row gutter={16}>
            <Col span={24}>
              <div className="mb-4">
                <Tag className="font-semibold uppercase" color="green">
                  {dataUserProfile?.data?.active
                    ? "Hoạt động"
                    : "Không hoạt động"}
                </Tag>
                {dataUserProfile?.data?.active &&
                  dataUserProfile?.data?.start_date &&
                  dataUserProfile?.data?.end_date && (
                    <span className="">
                      {formatDate(dataUserProfile?.data?.start_date)} -{" "}
                      {formatDate(dataUserProfile?.data?.end_date)}
                    </span>
                  )}
              </div>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <div className="mb-4">
                <span className="text-gray-400">Họ tên: </span>{" "}
                {dataUserProfile?.data?.name}
              </div>
              <div>
                <span className="text-gray-400">Giới tính: </span>
                {formatGender(dataUserProfile?.data?.gender || "")}
              </div>
            </Col>
            <Col span={8}>
              <p className="mb-4">
                <span className="text-gray-400">Email: </span>{" "}
                {dataUserProfile?.data?.email}
              </p>
              <div>
                <span className="text-gray-400">Ngày sinh: </span>
                {formatDate(dataUserProfile?.data?.date_of_birth || "")}
              </div>
            </Col>
            <Col span={8}>
              <p className="mb-4">
                <span className="text-gray-400">Vai trò: </span>
                {dataUserProfile?.data?.role?.name}
              </p>
              <div>
                <span className="text-gray-400">Số điện thoại: </span>
                {dataUserProfile?.data?.phone_number || "Chưa cập nhật"}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Tabs */}
      <Tabs size="large" className="mt-8" items={items} />
    </Card>
  );
};

export default ProfileManagement;

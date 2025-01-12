import { useQuery } from "@tanstack/react-query";
import { Card, Col, Row, Tabs, Tag } from "antd";
import { getUserProfileService } from "../../services";
import { formatDate } from "../../utils/functionUtils";
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
            <Col span={8}>
              <div className="mb-4">
                <Tag className="font-semibold uppercase" color="green">
                  {dataUserProfile?.data?.active ? "Active" : "Inactive"}
                </Tag>
                {dataUserProfile?.data?.active &&
                  dataUserProfile?.data?.start_date && (
                    <span className="">
                      {dataUserProfile?.data?.start_date} -{" "}
                      {dataUserProfile?.data?.end_date}
                    </span>
                  )}
              </div>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <p className="mb-4">
                <span className="text-gray-400">Họ tên: </span>{" "}
                {dataUserProfile?.data?.name}
              </p>
              <p>
                <span className="text-gray-400">Giới tính: </span>
                {dataUserProfile?.data?.gender}
              </p>
            </Col>
            <Col span={8}>
              <p className="mb-4">
                <span className="text-gray-400">Email: </span>{" "}
                {dataUserProfile?.data?.email}
              </p>
              <p>
                <span className="text-gray-400">Ngày sinh: </span>
                {formatDate(dataUserProfile?.data?.date_of_birth || "")}
              </p>
            </Col>
            <Col span={8}>
              <p className="mb-4">
                <span className="text-gray-400">Vai trò: </span>
                {dataUserProfile?.data?.role?.name}
              </p>
              <p>
                <span className="text-gray-400">Số điện thoại: </span>
                <a href={`tel:${dataUserProfile?.data?.phone_number}`}>
                  {dataUserProfile?.data?.phone_number}
                </a>
              </p>
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

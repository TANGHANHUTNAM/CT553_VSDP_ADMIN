import { useQuery } from "@tanstack/react-query";
import { getPendingAssignmentService } from "../../services";
import { useAppSelector } from "../../hooks";
import { Card, Spin, Typography, Tag, Empty, Button } from "antd";
import { useNavigate } from "react-router-dom";
import {
  FileTextOutlined,
  CalendarOutlined,
  TagOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

import { ROUTER_URL } from "../../constants/routerIndex";
import { formatDateTime } from "../../utils/functionUtils";
import { IDataAssignmentReviewer } from "../../interfaces";
import Access from "../../router/Access";
import { ALL_PERMISSIONS } from "../../constants/permissions";

const { Title, Text } = Typography;

const ReviewApplicantManagement: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const { data: form_response_assigned_pending, isLoading } = useQuery({
    queryKey: ["assignments_pending"],
    queryFn: async () => (await getPendingAssignmentService(user!.id)).data,
    enabled: !!user?.id,
  });

  const handleViewDetails = (record: IDataAssignmentReviewer) => {
    const url = ROUTER_URL.DETAIL_REVIEW_APPLICATION_PAGE(record.id.toString());
    navigate(url);
  };

  return (
    <div className="">
      <Card className="mb-6 rounded-xl">
        <Title level={3} className="mb-6 text-gray-800">
          Danh sách hồ sơ được phân công đang chờ xử lý
        </Title>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spin size="large" />
          </div>
        ) : form_response_assigned_pending &&
          form_response_assigned_pending?.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {form_response_assigned_pending.map(
              (record: IDataAssignmentReviewer) => (
                <Card
                  key={record.id}
                  className="rounded-lg border border-gray-200 bg-white shadow-md transition-all duration-300 hover:shadow-lg dark:border-gray-500 dark:bg-gray-800"
                >
                  <div className="space-y-4">
                    {/* Tiêu đề hồ sơ */}
                    <div className="flex items-center space-x-3">
                      <FileTextOutlined className="text-xl text-primary" />
                      <Text strong className="truncate text-lg">
                        {record.form_response.name}
                      </Text>
                    </div>

                    {/* Mã hồ sơ */}
                    <div className="flex items-center space-x-3">
                      <TagOutlined className="text-gray-500 dark:text-gray-300" />
                      <Text className="text-gray-600 dark:text-gray-300">
                        Mã: {record.form_response.id}
                      </Text>
                    </div>

                    {/* Phần chấm điểm */}
                    <div className="flex items-center space-x-3">
                      <TagOutlined className="text-blue-500" />
                      <Tag color="blue" className="font-medium">
                        {record.scoring_section.name}
                      </Tag>
                    </div>

                    {/* Ngày phân công */}
                    <div className="flex items-center space-x-3">
                      <CalendarOutlined className="text-gray-500 dark:text-gray-300" />
                      <Text className="text-gray-600 dark:text-gray-300">
                        Được giao vào {formatDateTime(record.created_at)}
                      </Text>
                    </div>

                    {/* Nút hành động */}
                    <Access
                      hideChildren
                      permission={ALL_PERMISSIONS.REVIEW_APPLICANT.VIEW_DETAIL}
                    >
                      <Button
                        type="primary"
                        icon={<ArrowRightOutlined />}
                        className="mt-4 w-full rounded-md"
                        onClick={() => handleViewDetails(record)}
                      >
                        Xem và chấm điểm
                      </Button>
                    </Access>
                  </div>
                </Card>
              ),
            )}
          </div>
        ) : (
          <Empty
            className="mt-40"
            description={
              <span className="text-gray-500">
                Không có hồ sơ được phân công đang chờ xử lý!
              </span>
            }
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </Card>
    </div>
  );
};

export default ReviewApplicantManagement;

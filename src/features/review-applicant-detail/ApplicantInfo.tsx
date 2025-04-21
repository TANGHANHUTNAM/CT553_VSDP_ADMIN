import { Card, Tag, Typography } from "antd";
import { IFormResponsesResponse } from "../../interfaces";
import { colorStatusSubmit, formatDateTime } from "../../utils/functionUtils";

const { Title, Text, Paragraph } = Typography;

interface ApplicantInfoProps {
  formResponse: IFormResponsesResponse;
}

const ApplicantInfo: React.FC<ApplicantInfoProps> = ({ formResponse }) => {
  return (
    <Card className="mb-6 rounded-lg border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
      <Title level={4} className="text-gray-800 dark:text-gray-100">
        Thông tin ứng viên
      </Title>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <Text strong className="text-gray-800 dark:text-gray-200">
            Họ tên:
          </Text>
          <Paragraph className="text-gray-600 dark:text-gray-400">
            {formResponse.name || "-"}
          </Paragraph>
        </div>
        <div>
          <Text strong className="text-gray-800 dark:text-gray-200">
            Email:
          </Text>
          <Paragraph className="text-gray-600 dark:text-gray-400">
            {formResponse.email || "-"}
          </Paragraph>
        </div>
        <div>
          <Text strong className="text-gray-800 dark:text-gray-200">
            Số điện thoại:
          </Text>
          <Paragraph className="text-gray-600 dark:text-gray-400">
            {formResponse.phone_number || "-"}
          </Paragraph>
        </div>
        <div>
          <Text strong className="text-gray-800 dark:text-gray-200">
            Tên trường:
          </Text>
          <Paragraph className="text-gray-600 dark:text-gray-400">
            {formResponse.university || "-"}
          </Paragraph>
        </div>
        <div>
          <Text strong className="text-gray-800 dark:text-gray-200">
            Trạng thái:
          </Text>
          <Tag
            color={colorStatusSubmit(
              formResponse.status as
                | "SUBMITTED"
                | "CHECKED"
                | "REJECTED"
                | "FAILED"
                | "PASSED",
            )}
            className="mt-1"
          >
            {formResponse.status || "-"}
          </Tag>
        </div>
        <div>
          <Text strong className="text-gray-800 dark:text-gray-200">
            Thời gian nộp:
          </Text>
          <Paragraph className="text-gray-600 dark:text-gray-400">
            {formatDateTime(formResponse.created_at) || "-"}
          </Paragraph>
        </div>
      </div>
    </Card>
  );
};

export default ApplicantInfo;

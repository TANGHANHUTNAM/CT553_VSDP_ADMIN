import { Card, Badge, Space, Typography, Empty } from "antd";
import { FileOutlined, SignatureOutlined } from "@ant-design/icons";
import {
  ISectionsDataFormResponsesResponse,
  IFieldSection,
} from "../../interfaces";
import RenderContentResponse from "../form-response/RenderContentResponse";

const { Title, Text } = Typography;

interface ResponseSectionProps {
  section: ISectionsDataFormResponsesResponse;
  index: number;
}

const ResponseSection: React.FC<ResponseSectionProps> = ({
  section,
  index,
}) => {
  const blocks = section.fields.flatMap((field) => field || []);

  return (
    <Card
      title={
        <Space>
          <Badge
            count={index + 1}
            style={{ backgroundColor: "#1890ff" }}
            className="mr-2"
          />
          <Title level={5} className="m-0 text-gray-800 dark:text-gray-100">
            {section.name || `Phần ${index + 1}`}
          </Title>
        </Space>
      }
      className="mb-6 rounded-lg border-gray-200 bg-white shadow-md transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2">
        {blocks.length > 0 ? (
          blocks.map((block: IFieldSection) => (
            <div key={block.id} className="flex flex-col">
              <Space className="mb-2">
                {block.blockType === "Uploader" && (
                  <FileOutlined className="text-blue-500 dark:text-blue-400" />
                )}
                {block.blockType === "Signature" && (
                  <SignatureOutlined className="text-purple-500 dark:text-purple-400" />
                )}
                <Text strong className="text-gray-800 dark:text-gray-200">
                  {block.label || "Không có nhãn"}
                </Text>
              </Space>
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
                <RenderContentResponse
                  blockType={block.blockType}
                  value={block.value}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center">
            <Empty description="Không có dữ liệu" />
          </div>
        )}
      </div>
    </Card>
  );
};

export default ResponseSection;

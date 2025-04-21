import { useQuery } from "@tanstack/react-query";
import {
  Card,
  Descriptions,
  Empty,
  Space,
  Table,
  TableColumnsType,
  Tag,
  Typography,
} from "antd";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import InputSearchComponent from "../../components/InputSearchComponent";
import LoadingComponent from "../../components/LoadingComponent";
import { useAppSelector } from "../../hooks";
import { ICompletedAssignment } from "../../interfaces";
import { getCompletedAssignmentsService } from "../../services";
import { formatDateTime } from "../../utils/functionUtils";
import ModalViewInforResponseForm from "../form-response/ModalViewInforResponseForm";

const { Title, Text } = Typography;

const HistoryReviewManagement: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const [searchText, setSearchText] = useState<string>("");
  const { data, isLoading } = useQuery({
    queryKey: ["completedAssignments", user?.id],
    queryFn: async () => {
      return (await getCompletedAssignmentsService()).data;
    },
    enabled: !!user?.id,
  });

  const filteredData = data?.filter((item: ICompletedAssignment) =>
    `${item.applicantName} ${item.applicantEmail}`
      .toLowerCase()
      .includes(searchText.toLowerCase()),
  );

  const columns: TableColumnsType<ICompletedAssignment> = [
    {
      title: "Người nộp",
      dataIndex: "applicantName",
      key: "applicantName",
      render: (name: string, record: ICompletedAssignment) => (
        <Space>
          <Text strong>{name}</Text>
          <Text type="secondary">({record.applicantEmail})</Text>
        </Space>
      ),
    },
    {
      title: "Biểu mẫu",
      dataIndex: "formName",
      key: "formName",
    },
    {
      title: "Phần điểm",
      dataIndex: "scoringSectionName",
      key: "scoringSectionName",
    },
    {
      align: "center",
      title: "Tổng điểm chấm",
      key: "totalScore",
      render: (_, record: ICompletedAssignment) => (
        <Text strong>{`${record.totalScore}/${record.maxScore}`}</Text>
      ),
    },
    {
      title: "Ngày hoàn thành",
      dataIndex: "completedAt",
      key: "completedAt",
      render: (value: string) => formatDateTime(value),
    },
    {
      title: "Trạng thái",
      key: "status",
      render: () => <Tag color="green">Hoàn thành</Tag>,
    },
    {
      align: "center",
      dataIndex: "action",
      width: 120,
      title: "Hành động",
      key: "action",
      render: (_, record: ICompletedAssignment) => (
        <Space size="middle">
          <ModalViewInforResponseForm
            record={record.formResponseId.toString()}
          />
        </Space>
      ),
    },
  ];

  const expandedRowRender = (record: ICompletedAssignment) => {
    return (
      <Card style={{ margin: "0 16px" }}>
        <Descriptions title="Chi tiết điểm số" column={1} bordered size="small">
          {record.scores.map((score) => (
            <Descriptions.Item
              key={score.criteriaId}
              label={`${score.criteriaName} (${score.scoreValue}/${score.maxScore})`}
            >
              {score.comment || "Không có ghi chú"}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </Card>
    );
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <Title level={2} style={{ marginBottom: "24px" }}>
        Lịch sử chấm điểm
      </Title>
      <InputSearchComponent
        placeholder="Tìm kiếm theo tên hoặc email"
        allowClear
        enterButton={<BiSearch className="text-lg" />}
        size="middle"
        onSearch={(value) => setSearchText(value)}
        onChange={(e) => setSearchText(e.target.value)}
        className="mb-4 w-[300px]"
      />
      {isLoading ? (
        <LoadingComponent />
      ) : !data || data.length === 0 ? (
        <Card>
          <Empty description="Không có hồ sơ nào để hiển thị" />
        </Card>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredData}
          size="middle"
          rowKey="assignmentId"
          expandable={{ expandedRowRender }}
          pagination={false}
          bordered
        />
      )}
    </div>
  );
};

export default HistoryReviewManagement;

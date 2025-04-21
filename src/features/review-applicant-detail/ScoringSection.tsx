import { CheckCircleOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Space,
  Typography,
} from "antd";
import parse from "html-react-parser";
import toast from "react-hot-toast";
import { useAppSelector } from "../../hooks";
import { IAssignmentDetails, IScoreRequest } from "../../interfaces";
import { saveScoreService } from "../../services";
interface FormValues {
  [key: `score_${number}`]: number;
  [key: `comment_${number}`]: string;
}
const { Title, Text } = Typography;

interface ScoringSectionProps {
  scoringSection: IAssignmentDetails["scoring_section"];
  assignmentId: number;
  formResponseId: number;
}

const ScoringSection: React.FC<ScoringSectionProps> = ({
  scoringSection,
  assignmentId,
  formResponseId,
}) => {
  const [form] = Form.useForm();

  const { user } = useAppSelector((state) => state.user);
  const queryClient = useQueryClient();
  const mutationSaveScore = useMutation({
    mutationFn: async (data: IScoreRequest[]) => {
      return await saveScoreService(assignmentId, data);
    },
    onSuccess: (data) => {
      if (data && data.data) {
        toast.success(data.message as string);
        queryClient.invalidateQueries({
          queryKey: ["assignmentDetails"],
        });
        queryClient.invalidateQueries({
          queryKey: ["assignments_pending"],
        });
        queryClient.invalidateQueries({
          queryKey: ["completedAssignments"],
        });
      }
      if (data && data.error) {
        toast.error(data.message as string);
      }
    },
    onError: () => {
      message.error("Lưu thất bại!");
    },
  });
  const handleSubmitScores = async (values: FormValues) => {
    if (!user?.id) {
      toast.error("Không tìm thấy thông tin người dùng!");
      return;
    }
    const scores = scoringSection.scoring_criteria.map((criteria) => ({
      scoring_criteria_id: criteria.id,
      score_value: values[`score_${criteria.id}`],
      comment: values[`comment_${criteria.id}`],
      user_id: user?.id,
      form_response_id: formResponseId,
    }));
    mutationSaveScore.mutate(scores);
    form.resetFields();
  };

  return (
    <Card className="rounded-lg border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
      <Space className="mb-4 w-full justify-between">
        <Title level={4} className="m-0 text-gray-800 dark:text-gray-100">
          Phần điểm: {scoringSection.name || "Chấm điểm"}
        </Title>
        <Text strong className="text-primary">
          Tổng điểm:{" "}
          {scoringSection.scoring_criteria.reduce(
            (sum, c) => sum + c.max_score,
            0,
          )}
        </Text>
      </Space>
      <Text className="mb-6 block text-gray-600 dark:text-gray-400">
        {parse(scoringSection.description || "Không có mô tả")}
      </Text>
      <Form
        form={form}
        onFinish={handleSubmitScores}
        layout="vertical"
        initialValues={scoringSection.scoring_criteria.reduce(
          (acc, criteria) => ({
            ...acc,
            [`score_${criteria.id}`]: criteria.min_score,
            [`comment_${criteria.id}`]: "",
          }),
          {},
        )}
      >
        {scoringSection.scoring_criteria.map((criteria) => (
          <div
            key={criteria.id}
            className="mb-6 rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700"
          >
            <Space className="mb-3 w-full justify-between">
              <Title level={5} className="m-0 text-gray-800 dark:text-gray-100">
                Tiêu chí: {criteria.name}
              </Title>
              <Text strong className="text-red-500 dark:text-red-400">
                Điểm ({criteria.min_score} - {criteria.max_score})
              </Text>
            </Space>
            <Text className="mb-3 block text-gray-600 dark:text-gray-400">
              {parse(criteria.description || "Không có mô tả")}
            </Text>
            <Form.Item
              name={`score_${criteria.id}`}
              label={<Text strong>Điểm:</Text>}
              rules={[
                { required: true, message: "Vui lòng nhập điểm!" },
                {
                  type: "number",
                  min: criteria.min_score,
                  max: criteria.max_score,
                  message: `Điểm phải từ ${criteria.min_score} đến ${criteria.max_score}`,
                },
              ]}
            >
              <InputNumber
                min={criteria.min_score}
                max={criteria.max_score}
                className="w-full"
                placeholder={`Nhập điểm từ ${criteria.min_score} đến ${criteria.max_score}`}
              />
            </Form.Item>
            <Form.Item
              name={`comment_${criteria.id}`}
              label={<Text strong>Ghi chú:</Text>}
              rules={[{ required: true, message: "Vui lòng nhập ghi chú!" }]}
            >
              <Input.TextArea
                rows={3}
                placeholder="Nhập ghi chú cho tiêu chí này"
                className="w-full"
              />
            </Form.Item>
          </div>
        ))}
        <Divider className="border-gray-200 dark:border-gray-600" />
        <Space className="w-full" direction="vertical" align="end">
          <Popconfirm
            onConfirm={() => form.submit()}
            title="Bạn có chắc chắn hoàn thành chấm điểm hồ sơ này?"
            description="Sau khi hoàn thành bạn không thể thay đổi?"
            okText="Có"
          >
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              loading={mutationSaveScore.isPending}
            >
              Lưu điểm số
            </Button>
          </Popconfirm>
        </Space>
      </Form>
    </Card>
  );
};

export default ScoringSection;

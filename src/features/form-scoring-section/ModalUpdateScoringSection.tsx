import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Input, InputNumber, Modal } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import CustomReactQuill from "../../components/CustomReactQuill";
import EditComponent from "../../components/EditComponent";
import {
  IDataScoringSectionCreateRequest,
  IScoringSecions,
} from "../../interfaces";
import { updateScoringSectionService } from "../../services/form-scoring-sections/form-scoring-sections-service";
interface IModalUpdaeScoringSectionProps {
  scoringSection: IScoringSecions;
}

const ModalUpdaeScoringSection: React.FC<IModalUpdaeScoringSectionProps> = ({
  scoringSection,
}) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);
  const [formUpdateScoringSection] = Form.useForm();
  const mutatationUpdateScoringSection = useMutation({
    mutationFn: async (data: IDataScoringSectionCreateRequest) =>
      updateScoringSectionService(scoringSection.id, data),
    onSuccess: (data) => {
      if (data && data.data) {
        queryClient.invalidateQueries({
          queryKey: ["scoring-sections", scoringSection.form_id],
        });
        toast.success(data.message as string);
        formUpdateScoringSection.resetFields();
        setOpen(false);
      }
      if (data && data.error) {
        toast.error(data.message as string);
      }
    },
    onError: () => {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    },
  });
  const onFinish = (values: IDataScoringSectionCreateRequest) => {
    mutatationUpdateScoringSection.mutate({
      ...values,
      form_id: scoringSection.form_id,
    });
  };
  const validateEditor = (_: unknown, content: string) => {
    if (
      !content ||
      content === "<p><br></p>" ||
      content.replace(/<(.|\n)*?>/g, "").trim() === ""
    ) {
      return Promise.reject(new Error(`Mô tả là bắt buộc`));
    }
    return Promise.resolve();
  };
  const sumScoreSection = scoringSection?.scoring_criteria?.reduce(
    (acc, curr) => acc + curr.max_score,
    0,
  );
  const maxScoreAvailable =
    scoringSection?.max_score - sumScoreSection! + scoringSection?.max_score;

  return (
    <>
      <EditComponent
        titleTooltip={`Chỉnh sửa ${scoringSection.name || ""}`}
        onClick={() => {
          formUpdateScoringSection.setFieldsValue(scoringSection);
          setOpen(true);
        }}
      />
      <Modal
        title={`Chỉnh sửa ${scoringSection.name || ""}`}
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => {
          formUpdateScoringSection.submit();
        }}
        centered
        okText="Cập nhật"
        okButtonProps={{ loading: mutatationUpdateScoringSection.isPending }}
        destroyOnClose={false}
        maskClosable={false}
        width={800}
        afterClose={() => {
          formUpdateScoringSection.resetFields();
        }}
      >
        <Form
          form={formUpdateScoringSection}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            label="Tên phần điểm"
            rules={[{ required: true, message: "Vui lòng nhập tên phần điểm" }]}
          >
            <Input placeholder="Nhập tên phần điểm" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            required
            rules={[
              {
                validator: validateEditor,
              },
            ]}
          >
            <CustomReactQuill
              value={formUpdateScoringSection.getFieldValue("description")}
              onChange={(value) =>
                formUpdateScoringSection.setFieldsValue({ description: value })
              }
              placeholder="Nhập mô tả"
            />
          </Form.Item>
          <Form.Item
            name="max_score"
            label="Điểm tối đa"
            rules={[
              { required: true, message: "Vui lòng nhập điểm tối đa" },
              {
                validator: (_, value) => {
                  if (value < sumScoreSection!) {
                    return Promise.reject(
                      new Error(
                        `Điểm tối đa phần điểm phải lớn hơn hoặc bằng tổng điểm các tiêu chí`,
                      ),
                    );
                  }
                  if (value < maxScoreAvailable) {
                    return Promise.reject(
                      new Error(
                        `Điểm tối đa phải lớn hơn hoặc bằng ${maxScoreAvailable}`,
                      ),
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
            extra={`Tổng điểm của các tiêu chí: ${sumScoreSection} điểm`}
          >
            <InputNumber
              placeholder="Nhập điểm tối đa cho phần này"
              min={1}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalUpdaeScoringSection;

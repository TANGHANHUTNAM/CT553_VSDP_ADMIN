import { useState } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, InputNumber, Modal } from "antd";
import CustomReactQuill from "../../components/CustomReactQuill";
import {
  IDataScoringCriteriaCreateRequest,
  IScoringSecions,
} from "../../interfaces";
import toast from "react-hot-toast";
import { createScoringCriteriaService } from "../../services/form-scoring-criterias/form-scoring-criteria-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IModalCreateNewScoringCriteriaProps {
  scoringSection: IScoringSecions;
}

const ModalCreateNewScoringCriteria: React.FC<
  IModalCreateNewScoringCriteriaProps
> = ({ scoringSection }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);
  const [formCreateScoringCriteria] = Form.useForm();
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
  const mutationCreateScoringSection = useMutation({
    mutationFn: async (data: IDataScoringCriteriaCreateRequest) =>
      createScoringCriteriaService(data),
    onSuccess: (data) => {
      if (data && data.data) {
        queryClient.invalidateQueries({
          queryKey: ["scoring-sections", scoringSection.form_id],
        });
        toast.success(data.message as string);
        formCreateScoringCriteria.resetFields();
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
  const onFinish = (values: IDataScoringCriteriaCreateRequest) => {
    mutationCreateScoringSection.mutate({
      ...values,
      scoring_section_id: scoringSection.id,
    });
  };
  const sumScoreSection = scoringSection?.scoring_criteria?.reduce(
    (acc, curr) => acc + curr.max_score,
    0,
  );
  const maxScoreAvailable =
    scoringSection.max_score - (sumScoreSection as number);
  return (
    <>
      <ButtonComponent
        size="small"
        type="default"
        text=""
        className="border border-primary text-primary"
        variant="text"
        textTooltip="Thêm tiêu chí mới"
        icon={<PlusOutlined />}
        onclick={() => setOpen(true)}
        disabled={(sumScoreSection as number) >= scoringSection.max_score}
      />
      <Modal
        title="Thêm tiêu chí mới"
        open={open}
        okText="Thêm mới"
        cancelText="Hủy"
        centered
        onCancel={() => setOpen(false)}
        onOk={() => {
          formCreateScoringCriteria.submit();
        }}
        okButtonProps={{
          loading: mutationCreateScoringSection.isPending,
        }}
        destroyOnClose
        maskClosable={false}
        width={800}
        afterClose={() => {
          formCreateScoringCriteria.resetFields();
        }}
      >
        <Form
          form={formCreateScoringCriteria}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            label="Tên tiêu chí"
            rules={[{ required: true, message: "Vui lòng nhập tên tiêu chí" }]}
          >
            <Input placeholder="Nhập tên tiêu chí" />
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
              value={formCreateScoringCriteria.getFieldValue("description")}
              onChange={(value) =>
                formCreateScoringCriteria.setFieldsValue({ description: value })
              }
              placeholder="Nhập mô tả"
            />
          </Form.Item>
          <Form.Item
            name="min_score"
            label="Điểm tối thiểu"
            rules={[
              { required: true, message: "Vui lòng nhập điểm tối thiểu" },
              {
                validator: (_, value) => {
                  if (
                    value > formCreateScoringCriteria.getFieldValue("max_score")
                  ) {
                    return Promise.reject(
                      new Error(
                        "Điểm tối thiểu phải nhỏ hơn hoặc bằng điểm tối đa",
                      ),
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <InputNumber
              placeholder="Nhập điểm tối thiểu cho phần này"
              min={0}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="max_score"
            label="Điểm tối đa"
            extra={`Số điểm tối đa có thể nhập: ${maxScoreAvailable}`}
            initialValue={maxScoreAvailable}
            rules={[
              { required: true, message: "Vui lòng nhập điểm tối đa" },

              {
                validator: (_, value) => {
                  if (
                    value < formCreateScoringCriteria.getFieldValue("min_score")
                  ) {
                    return Promise.reject(
                      new Error("Điểm tối đa phải lớn hơn điểm tối thiểu"),
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <InputNumber
              placeholder="Nhập điểm tối đa cho phần này"
              min={1}
              max={maxScoreAvailable}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateNewScoringCriteria;

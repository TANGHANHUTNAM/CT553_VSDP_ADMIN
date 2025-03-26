import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Input, InputNumber, Modal } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import CustomReactQuill from "../../components/CustomReactQuill";
import EditComponent from "../../components/EditComponent";
import {
  IDataScoringCriteriaCreateRequest,
  IScoringCriteria,
  IScoringSecions,
} from "../../interfaces";
import { updateScoringCriteriaService } from "../../services/form-scoring-criterias/form-scoring-criteria-service";
interface IModalUpdateScoringCriteriaProps {
  scoringSection: IScoringSecions;
  criteria: IScoringCriteria;
}

const ModalUpdateScoringCriteria: React.FC<
  IModalUpdateScoringCriteriaProps
> = ({ scoringSection, criteria }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);
  const [formUpdateScoringCriteria] = Form.useForm();
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
  const mutationUpdateScoringCriteria = useMutation({
    mutationFn: async (data: IDataScoringCriteriaCreateRequest) =>
      updateScoringCriteriaService(criteria.id, data),
    onSuccess: (data) => {
      if (data && data.data) {
        queryClient.invalidateQueries({
          queryKey: ["scoring-sections", scoringSection.form_id],
        });
        toast.success(data.message as string);
        formUpdateScoringCriteria.resetFields();
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
    mutationUpdateScoringCriteria.mutate({
      ...values,
      scoring_section_id: scoringSection.id,
    });
  };
  const sumScoreSection =
    scoringSection?.scoring_criteria?.reduce(
      (acc, curr) => acc + (curr.id !== criteria?.id ? curr.max_score : 0),
      0,
    ) || 0;

  const maxScoreAvailable =
    scoringSection.max_score - (sumScoreSection as number);
  return (
    <>
      <EditComponent
        titleTooltip={`Sửa tiêu chí: ${scoringSection.name || ""}`}
        onClick={() => {
          setOpen(true);
          formUpdateScoringCriteria.setFieldsValue(criteria);
          formUpdateScoringCriteria.validateFields();
        }}
      />
      <Modal
        title={`Sửa tiêu chí: ${scoringSection.name || ""}`}
        open={open}
        okText="Cập nhật"
        cancelText="Hủy"
        centered
        onCancel={() => setOpen(false)}
        onOk={() => {
          formUpdateScoringCriteria.submit();
        }}
        okButtonProps={{
          loading: mutationUpdateScoringCriteria.isPending,
        }}
        destroyOnClose
        maskClosable={false}
        width={800}
        afterClose={() => {
          formUpdateScoringCriteria.resetFields();
        }}
      >
        <Form
          form={formUpdateScoringCriteria}
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
              value={formUpdateScoringCriteria.getFieldValue("description")}
              onChange={(value) =>
                formUpdateScoringCriteria.setFieldsValue({ description: value })
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
                    value > formUpdateScoringCriteria.getFieldValue("max_score")
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
                    value < formUpdateScoringCriteria.getFieldValue("min_score")
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

export default ModalUpdateScoringCriteria;

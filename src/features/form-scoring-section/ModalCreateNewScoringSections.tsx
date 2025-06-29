import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, InputNumber, Modal } from "antd";
import ButtonComponent from "../../components/ButtonComponent";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createScoringSectionService } from "../../services/form-scoring-sections/form-scoring-sections-service";
import { IDataScoringSectionCreateRequest } from "../../interfaces";
import toast from "react-hot-toast";
import CustomReactQuill from "../../components/CustomReactQuill";

interface IModalCreateNewScoringSectionsProps {
  form_id: string;
}

const ModalCreateNewScoringSections: React.FC<
  IModalCreateNewScoringSectionsProps
> = ({ form_id }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);
  const [formCreateScoringSection] = Form.useForm();
  const mutatationCreateScoringSection = useMutation({
    mutationFn: async (data: IDataScoringSectionCreateRequest) =>
      createScoringSectionService(data),
    onSuccess: (data) => {
      if (data && data.data) {
        queryClient.invalidateQueries({
          queryKey: ["scoring-sections", form_id],
        });
        toast.success(data.message as string);
        formCreateScoringSection.resetFields();
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
    mutatationCreateScoringSection.mutate({ ...values, form_id });
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
  return (
    <>
      <ButtonComponent
        size="middle"
        type="primary"
        text="Thêm phần điểm"
        textTooltip="Thêm phần điểm"
        icon={<PlusOutlined />}
        onclick={() => setOpen(true)}
      />
      <Modal
        title="Thêm phần điểm mới"
        open={open}
        centered
        onCancel={() => setOpen(false)}
        onOk={() => {
          formCreateScoringSection.submit();
        }}
        okText="Thêm mới"
        okButtonProps={{ loading: mutatationCreateScoringSection.isPending }}
        destroyOnClose={false}
        maskClosable={false}
        width={800}
        afterClose={() => {
          formCreateScoringSection.resetFields();
        }}
      >
        <Form
          form={formCreateScoringSection}
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
              value={formCreateScoringSection.getFieldValue("description")}
              onChange={(value) =>
                formCreateScoringSection.setFieldsValue({ description: value })
              }
              placeholder="Nhập mô tả"
            />
          </Form.Item>
          <Form.Item
            name="max_score"
            label="Điểm tối đa"
            rules={[{ required: true, message: "Vui lòng nhập điểm tối đa" }]}
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

export default ModalCreateNewScoringSections;

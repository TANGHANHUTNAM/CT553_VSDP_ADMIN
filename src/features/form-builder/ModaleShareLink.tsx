import { FaRegShareFromSquare } from "react-icons/fa6";
import ButtonComponent from "../../components/ButtonComponent";
import { Form, InputNumber, Modal } from "antd";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { shareLinkFormService } from "../../services";
import toast from "react-hot-toast";

interface IModaleShareLinkProps {
  is_public: boolean;
  form_id: string;
}

const ModaleShareLink: React.FC<IModaleShareLinkProps> = ({
  is_public,
  form_id,
}) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState<boolean>(false);
  const mutationShareLinkForm = useMutation({
    mutationFn: async (data: { expiry_dates: number }) =>
      shareLinkFormService(form_id, data),
    onSuccess: (data) => {
      if (data && data.data) {
        toast.success(data.message as string);
        navigator.clipboard.writeText(data.data);
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
  const onFinish = async (value: { expiry_dates: number }) => {
    if (!form_id) {
      toast.error("Không tìm thấy biểu mẫu");
      return;
    }
    mutationShareLinkForm.mutate(value);
  };

  return (
    <>
      <ButtonComponent
        disabled={!is_public}
        text=""
        type="primary"
        size="middle"
        textTooltip="Chia sẻ"
        icon={<FaRegShareFromSquare />}
        onclick={() => setOpen(true)}
      />
      <Modal
        afterClose={() => form.resetFields()}
        open={open}
        centered
        onCancel={() => setOpen(false)}
        title="Chia sẻ link biểu mẫu"
        maskClosable={false}
        okButtonProps={{ loading: mutationShareLinkForm.isPending }}
        onOk={() => form.submit()}
        destroyOnClose={true}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Ngày hết hạn"
            name="expiry_dates"
            rules={[
              { required: true, message: "Vui lòng nhập số ngày hết hạn" },
            ]}
            initialValue={1}
          >
            <InputNumber
              min={1}
              placeholder="Nhập số ngày hết hạn"
              className="w-full"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModaleShareLink;

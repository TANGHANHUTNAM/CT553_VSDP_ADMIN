import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, InputNumber, Modal } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegShareFromSquare } from "react-icons/fa6";
import ButtonComponent from "../../components/ButtonComponent";
import {
  getExpiryDateLinkFormService,
  shareLinkFormService,
} from "../../services";
import { formatDate } from "../../utils/functionUtils";
import { Tooltip, Typography } from "antd";
const { Text } = Typography;
import { CopyOutlined } from "@ant-design/icons";
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
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["expiry_date_link_form", form_id],
    queryFn: async () => getExpiryDateLinkFormService(form_id),
    enabled: !!form_id && open,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const mutationShareLinkForm = useMutation({
    mutationFn: async (data: { expiry_dates: number }) =>
      shareLinkFormService(form_id, data),
    onSuccess: (data) => {
      if (data && data.data) {
        toast.success(data.message as string);
        queryClient.invalidateQueries({
          queryKey: ["expiry_date_link_form", form_id],
        });
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
  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success("Đã sao chép liên kết");
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
        okText="Tạo mới"
        title="Chia sẻ link biểu mẫu"
        maskClosable={false}
        okButtonProps={{ loading: mutationShareLinkForm.isPending }}
        onOk={() => form.submit()}
        destroyOnClose={true}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Số ngày hết hạn"
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
        {data?.data?.expiry_date && (
          <div className="mt-4 rounded-md border border-gray-200 bg-gray-50 p-3">
            <div className="mb-1 flex items-center justify-between">
              <Text strong>Link chia sẻ:</Text>
              <Tooltip title="Sao chép">
                <CopyOutlined
                  onClick={() => handleCopy(data.data!.link as string)}
                  className="cursor-pointer text-blue-500 hover:text-blue-700"
                />
              </Tooltip>
            </div>
            <div className="mb-2 truncate text-sm text-blue-600 underline">
              <a
                href={data.data.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.data.link}
              </a>
            </div>
            <Text type="secondary">
              Ngày hết hạn: {formatDate(data.data.expiry_date)}
            </Text>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ModaleShareLink;

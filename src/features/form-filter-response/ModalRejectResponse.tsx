import { Form, Input, Modal, Tooltip } from "antd";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { IDataFormFilterResponse } from "../../interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rejectResponseService } from "../../services/form-filter-response/form-filter-response-service";
import toast from "react-hot-toast";

interface IModalRejectResponseProps {
  response: IDataFormFilterResponse;
}

const ModalRejectResponse: React.FC<IModalRejectResponseProps> = ({
  response,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [formReject] = Form.useForm();
  const queryClient = useQueryClient();
  const mutationRejectResponse = useMutation({
    mutationFn: async (values: { rejected_reason: string }) => {
      return await rejectResponseService(response.id, values);
    },
    onSuccess: (data) => {
      if (data && data.data) {
        toast.success(data.message as string);
        queryClient.invalidateQueries({
          queryKey: ["form-filter-response"],
        });
        setOpen(false);
        formReject.resetFields();
      }
      if (data && data.error) {
        toast.error(data.message as string);
      }
    },
    onError: () => {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
    },
  });
  const onFinish = (values: { rejected_reason: string }) => {
    mutationRejectResponse.mutate(values);
  };
  return (
    <>
      <Tooltip title="Từ chối hồ sơ" placement="top">
        <IoClose
          onClick={() => {
            setOpen(true);
          }}
          className="cursor-pointer text-xl text-red-500 transition-all duration-200 hover:scale-110 hover:text-red-600"
        />
      </Tooltip>
      <Modal
        title={`Từ chối hồ sơ ${response?.name}`}
        open={open}
        onCancel={() => setOpen(false)}
        centered
        onOk={() => formReject.submit()}
        okButtonProps={{
          loading: mutationRejectResponse.isPending,
        }}
        okText="Xác nhận"
        afterClose={() => {
          formReject.resetFields();
        }}
        destroyOnClose={true}
      >
        <Form form={formReject} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="rejected_reason"
            label="Lý do từ chối"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập lý do từ chối",
              },
            ]}
          >
            <Input.TextArea
              placeholder="Nhập lý do từ chối"
              rows={4}
            ></Input.TextArea>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalRejectResponse;

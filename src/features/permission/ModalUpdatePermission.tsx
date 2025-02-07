import { Form, Input, Modal, Select } from "antd";
import { dataMethod, dataModule } from "../../constants/permissions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IDataPermissionRequest, IPermissionResponse } from "../../interfaces";
import { updatePermissionService } from "../../services";
import toast from "react-hot-toast";

interface IModalUpdatePermissionProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  dataDetailPermission: IPermissionResponse | null;
}

const ModalUpdatePermission: React.FC<IModalUpdatePermissionProps> = ({
  open,
  setOpen,
  dataDetailPermission,
}) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const mutateUpdatePermission = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: IDataPermissionRequest;
    }) => {
      const response = await updatePermissionService(id, data);
      return response;
    },
    onSuccess: (data) => {
      if (data && data.data) {
        toast.success(data.message as string);
        queryClient.invalidateQueries({ queryKey: ["permissions"] });
        setOpen(false);
      }
      if (data && data.error) {
        toast.error(data.message as string);
      }
    },
  });

  const onCreate = (data: IDataPermissionRequest) => {
    mutateUpdatePermission.mutate({
      id: dataDetailPermission?.id as number,
      data,
    });
  };
  return (
    <>
      <Modal
        open={open}
        title={`Cập nhật quyền hạn ${dataDetailPermission?.api_path || ""}`}
        okText="Cập nhật"
        cancelText="Hủy"
        maskClosable={false}
        afterOpenChange={(isOpen) => {
          if (!isOpen) {
            form.resetFields();
          }
          if (isOpen && dataDetailPermission) {
            form.setFieldsValue(dataDetailPermission);
          }
        }}
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: mutateUpdatePermission.isPending,
        }}
        onCancel={() => setOpen(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            disabled={mutateUpdatePermission.isPending}
            initialValues={{ modifier: "public" }}
            clearOnDestroy
            onFinish={(values) => onCreate(values)}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="name"
          label="Mô tả"
          rules={[{ required: true, message: "Mô tả không được để trống!" }]}
        >
          <Input placeholder="Mô tả" />
        </Form.Item>
        <Form.Item
          name="api_path"
          label="API Path"
          rules={[
            {
              required: true,
              message: "API path không được để trống!",
            },
          ]}
        >
          <Input placeholder="API path" />
        </Form.Item>
        <Form.Item
          name="method"
          label="Method"
          rules={[{ required: true, message: "Method không được để trống!" }]}
        >
          <Select placeholder="Chọn method" options={dataMethod} />
        </Form.Item>
        <Form.Item
          name="module"
          label="Module"
          rules={[{ required: true, message: "Module không được để trống!" }]}
        >
          <Select placeholder="Chọn module" options={dataModule} />
        </Form.Item>
      </Modal>
    </>
  );
};

export default ModalUpdatePermission;

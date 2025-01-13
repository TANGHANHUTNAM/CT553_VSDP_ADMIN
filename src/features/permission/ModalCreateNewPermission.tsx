import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Input, Modal, Select } from "antd";
import { dataMethod, dataModule } from "../../constants/permissions";
import toast from "react-hot-toast";
import { IDataPermissionRequest } from "../../interfaces";
import { createPermissionService } from "../../services/permission/permission-service";

interface IModalCreateNewPermissionProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalCreateNewPermission: React.FC<IModalCreateNewPermissionProps> = ({
  open,
  setOpen,
}) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const mutateCreatePermission = useMutation({
    mutationFn: async (data: IDataPermissionRequest) => {
      const response = await createPermissionService(data);
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
    onError: () => {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    },
  });

  const onCreate = (data: IDataPermissionRequest) => {
    mutateCreatePermission.mutate(data);
  };
  return (
    <>
      <Modal
        open={open}
        title="Tạo mới quyền hạn"
        okText="Tạo"
        cancelText="Hủy"
        maskClosable={false}
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: mutateCreatePermission.isPending,
        }}
        onCancel={() => setOpen(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            disabled={mutateCreatePermission.isPending}
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

export default ModalCreateNewPermission;

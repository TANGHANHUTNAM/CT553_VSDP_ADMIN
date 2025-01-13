import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Input, Modal } from "antd";
import { IDataRoleCreateRequest } from "../../interfaces";
import { createRoleService } from "../../services";
import toast from "react-hot-toast";

interface IModalCreateNewRoleProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalCreateNewRole: React.FC<IModalCreateNewRoleProps> = ({
  open,
  setOpen,
}) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const mutateCreateRole = useMutation({
    mutationFn: async (data: IDataRoleCreateRequest) => {
      const response = await createRoleService(data);
      return response;
    },
    onSuccess: (data) => {
      if (data && data.data) {
        queryClient.invalidateQueries({ queryKey: ["roles"] });
        toast.success(data.message as string);
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
  const onCreate = (data: IDataRoleCreateRequest) => {
    const { name, description } = data;
    const nameUpperCase = name.toUpperCase();
    mutateCreateRole.mutate({ name: nameUpperCase, description });
  };
  return (
    <>
      <Modal
        open={open}
        title="Tạo mới vai trò"
        okText="Tạo"
        cancelText="Hủy"
        maskClosable={false}
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: mutateCreateRole.isPending,
        }}
        onCancel={() => setOpen(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            disabled={mutateCreateRole.isPending}
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
          label="Tên vai trò"
          rules={[
            { required: true, message: "Tên vai trò không được để trống!" },
          ]}
        >
          <Input className="uppercase" placeholder="Tên vai trò" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô tả"
          rules={[
            {
              required: true,
              message: "Mô tả không được để trống!",
            },
          ]}
        >
          <Input placeholder="Mô tả" />
        </Form.Item>
      </Modal>
    </>
  );
};

export default ModalCreateNewRole;

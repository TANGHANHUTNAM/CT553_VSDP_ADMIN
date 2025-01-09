import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Input, Modal, Select } from "antd";
import toast from "react-hot-toast";
import { IDataUserCreateRequest } from "../../interfaces";
import { createUserService } from "../../services";

interface IModalCreateNewUserProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  dataAllRoles: { label: string; value: number }[];
}

const ModalCreateNewUser: React.FC<IModalCreateNewUserProps> = ({
  open,
  setOpen,
  dataAllRoles,
}) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const mutateCreateUser = useMutation({
    mutationFn: async (data: IDataUserCreateRequest) => {
      const response = await createUserService(data);
      console.log("response", response);
      return response;
    },
    onSuccess: (data) => {
      if (data && data.data) {
        toast.success(data.message as string);
        queryClient.invalidateQueries({ queryKey: ["users"] });
        setOpen(false);
      }
      if (data && data.error) {
        toast.error(data.message as string);
      }
    },
  });

  const onCreate = (data: IDataUserCreateRequest) => {
    mutateCreateUser.mutate(data);
  };

  return (
    <>
      <Modal
        open={open}
        title="Tạo mới người dùng"
        okText="Tạo"
        cancelText="Hủy"
        maskClosable={false}
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: mutateCreateUser.isPending,
        }}
        onCancel={() => setOpen(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            disabled={mutateCreateUser.isPending}
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
          label="Họ tên"
          rules={[{ required: true, message: "Họ tên không được để trống" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Email không được để trống",
            },
            {
              type: "email",
              message: "Email không hợp lệ",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="roleId"
          label="Vai trò"
          rules={[{ required: true, message: "Vai trò không được để trống" }]}
        >
          <Select options={dataAllRoles} />
        </Form.Item>
      </Modal>
    </>
  );
};

export default ModalCreateNewUser;

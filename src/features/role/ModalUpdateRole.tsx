import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Input, Modal } from "antd";
import toast from "react-hot-toast";
import { IDataRoleUpdateRequest, IRoleResponse } from "../../interfaces";
import { updateRoleService } from "../../services";

interface IModalUpdateRoleProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  dataDetailRole: IRoleResponse | null;
}

const ModalUpdateRole: React.FC<IModalUpdateRoleProps> = ({
  dataDetailRole,
  open,
  setOpen,
}) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const mutateUpdateRole = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: IDataRoleUpdateRequest;
    }) => {
      const response = await updateRoleService(id, data);
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
  const onCreate = (data: IDataRoleUpdateRequest) => {
    const { name, description } = data;
    const nameUpperCase = name.toUpperCase();
    mutateUpdateRole.mutate({
      id: dataDetailRole?.id as number,
      data: { name: nameUpperCase, description },
    });
  };
  return (
    <>
      <Modal
        open={open}
        title={`Cập nhật vai trò ${dataDetailRole?.name ?? ""}`}
        okText="Cập nhật"
        cancelText="Hủy"
        maskClosable={false}
        afterOpenChange={(open) => {
          if (!open) {
            form.resetFields();
          }

          if (open && dataDetailRole) {
            form.setFieldsValue({
              name: dataDetailRole.name,
              description: dataDetailRole.description,
            });
          }
        }}
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: mutateUpdateRole.isPending,
        }}
        onCancel={() => setOpen(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            disabled={mutateUpdateRole.isPending}
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

export default ModalUpdateRole;

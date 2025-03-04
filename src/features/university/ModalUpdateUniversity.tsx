import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Input, Modal, Switch } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import EditComponent from "../../components/EditComponent";
import { ALL_PERMISSIONS } from "../../constants/permissions";
import {
  IDataUniversityUpdateRequest,
  IUniversityResponse,
} from "../../interfaces";
import Access from "../../router/Access";
import { updateUniversityService } from "../../services";

interface IModalCreateNewUniversityProps {
  dataDetailUniversity: IUniversityResponse;
}

const ModalUpdateUniversity: React.FC<IModalCreateNewUniversityProps> = ({
  dataDetailUniversity,
}) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [open, setOpen] = useState<boolean>(false);

  const mutateUpdateUniversity = useMutation({
    mutationFn: async (data: IDataUniversityUpdateRequest) => {
      const response = await updateUniversityService(
        dataDetailUniversity.id,
        data,
      );
      return response;
    },
    onSuccess: (data) => {
      if (data && data.data) {
        queryClient.invalidateQueries({ queryKey: ["universities"] });
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
  const onCreate = (data: IDataUniversityUpdateRequest) => {
    mutateUpdateUniversity.mutate(data);
  };
  return (
    <>
      <Access hideChildren permission={ALL_PERMISSIONS.UNIVERSITY.UPDATE}>
        <EditComponent
          titleTooltip={`Chỉnh sửa ${dataDetailUniversity.name ?? ""}`}
          onClick={() => {
            setOpen(true);
          }}
        />
      </Access>
      <Modal
        open={open}
        title="Cập nhật trường học"
        okText="Cập nhật"
        cancelText="Hủy"
        maskClosable={false}
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: mutateUpdateUniversity.isPending,
        }}
        afterOpenChange={(open) => {
          if (!open) {
            form.resetFields();
          }

          if (open && dataDetailUniversity) {
            form.setFieldsValue({
              name: dataDetailUniversity.name,
              is_active: dataDetailUniversity.is_active,
            });
          }
        }}
        onCancel={() => setOpen(false)}
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            disabled={mutateUpdateUniversity.isPending}
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
          label="Tên trường"
          rules={[
            { required: true, message: "Tên trường không được để trống!" },
          ]}
        >
          <Input placeholder="Nhập tên trường" />
        </Form.Item>
        <Form.Item name="is_active" label="Kích hoạt">
          <Switch />
        </Form.Item>
      </Modal>
    </>
  );
};

export default ModalUpdateUniversity;

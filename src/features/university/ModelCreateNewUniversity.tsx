import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Input, Modal } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaCirclePlus } from "react-icons/fa6";
import ButtonComponent from "../../components/ButtonComponent";
import { ALL_PERMISSIONS } from "../../constants/permissions";
import { IDataUniversityCreateRequest } from "../../interfaces";
import Access from "../../router/Access";
import { createUniversityService } from "../../services";

const ModelCreateNewUniversity: React.FC = () => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [open, setOpen] = useState<boolean>(false);
  const mutateCreateUniversity = useMutation({
    mutationFn: async (data: IDataUniversityCreateRequest) => {
      const response = await createUniversityService(data);
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
  const onCreate = (data: IDataUniversityCreateRequest) => {
    mutateCreateUniversity.mutate(data);
  };
  return (
    <>
      <Access hideChildren permission={ALL_PERMISSIONS.UNIVERSITY.CREATE}>
        <ButtonComponent
          text="Thêm mới"
          textTooltip="Thêm mới trường"
          icon={<FaCirclePlus className="" />}
          size="large"
          type="primary"
          onclick={() => setOpen(true)}
        />
      </Access>
      <Modal
        open={open}
        title="Tạo mới trường học"
        okText="Tạo"
        cancelText="Hủy"
        maskClosable={false}
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: mutateCreateUniversity.isPending,
        }}
        onCancel={() => setOpen(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            disabled={mutateCreateUniversity.isPending}
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
          label="Tên truờng"
          rules={[
            { required: true, message: "Tên truờng không được để trống!" },
          ]}
        >
          <Input placeholder="Tên truờng" />
        </Form.Item>
      </Modal>
    </>
  );
};

export default ModelCreateNewUniversity;

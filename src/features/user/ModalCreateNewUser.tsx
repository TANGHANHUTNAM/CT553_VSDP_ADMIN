import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DatePicker, Form, Input, Modal, Select } from "antd";
import toast from "react-hot-toast";
import { IDataUserCreateRequest } from "../../interfaces";
import { createUserService } from "../../services";
import dayjs, { Dayjs } from "dayjs";
const { RangePicker } = DatePicker;

interface IDataForm {
  name: string;
  email: string;
  roleId: number;
  time: [string, string];
}

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
    onError: () => {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    },
  });

  const onCreate = (data: IDataForm) => {
    const { time, ...restData } = data;
    const [start_date, end_date] = time;
    mutateCreateUser.mutate({
      ...restData,
      start_date,
      end_date,
    });
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
          <Input placeholder="Họ tên" />
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
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="roleId"
          label="Vai trò"
          rules={[{ required: true, message: "Vai trò không được để trống" }]}
        >
          <Select placeholder="Chọn vai trò" options={dataAllRoles} />
        </Form.Item>
        <Form.Item
          label="Chọn thời gian hoạt động"
          name={"time"}
          rules={[
            { required: true, message: "Thời gian không được để trống!" },
          ]}
          getValueProps={(value: string[]) => ({
            value: value
              ? [value[0] && dayjs(value[0]), value[1] && dayjs(value[1])]
              : [],
          })}
          normalize={(value: Dayjs[]) => {
            return value
              ? [
                  value[0] && value[0].tz().format(),
                  value[1] && value[1].tz().format(),
                ]
              : [];
          }}
        >
          <RangePicker format={"DD/MM/YYYY"} style={{ width: "100%" }} />
        </Form.Item>
      </Modal>
    </>
  );
};

export default ModalCreateNewUser;

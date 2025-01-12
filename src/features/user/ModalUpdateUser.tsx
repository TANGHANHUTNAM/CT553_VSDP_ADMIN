import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
import toast from "react-hot-toast";
import { GENDER } from "../../constants/tableManagement";
import { IDataUserUpdateRequest, IUsersResponse } from "../../interfaces";
import { updateUserService } from "../../services";

interface IModalUpdateUserProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  userData: IUsersResponse | null;
  dataAllRoles: { label: string; value: number }[];
}

const ModalUpdateUser: React.FC<IModalUpdateUserProps> = ({
  open,
  setOpen,
  userData,
  dataAllRoles,
}) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const mutateUpdateUser = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: IDataUserUpdateRequest;
    }) => {
      const response = await updateUserService(id, data);
      return response;
    },
    onSuccess: (data) => {
      if (data && data.data) {
        toast.success(data.message as string);
        setOpen(false);
      }
      if (data && data.error) {
        toast.error(data.message as string);
      }
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const onCreate = (data: IDataUserUpdateRequest) => {
    mutateUpdateUser.mutate({ id: userData?.id as number, data });
  };
  return (
    <>
      <Modal
        open={open}
        title={`Cập nhật thông tin người dùng ${userData?.email || ""}`}
        okText="Cập nhật"
        cancelText="Hủy"
        style={{ top: 30 }}
        width={1000}
        maskClosable={false}
        afterOpenChange={(open) => {
          if (open && userData) {
            form.setFieldsValue({
              ...userData,
            });
          }
        }}
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: mutateUpdateUser.isPending,
        }}
        onCancel={() => setOpen(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            disabled={mutateUpdateUser.isPending}
            initialValues={{ modifier: "public" }}
            clearOnDestroy
            onFinish={(values) => onCreate(values)}
          >
            {dom}
          </Form>
        )}
      >
        <Row gutter={16}>
          <Col span={12}>
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
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="roleId"
              label="Vai trò"
              rules={[
                { required: true, message: "Vai trò không được để trống" },
              ]}
            >
              <Select options={dataAllRoles} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Họ tên"
              rules={[
                { required: true, message: "Họ tên không được để trống" },
              ]}
            >
              <Input placeholder="Họ tên" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="phone_number" label="Số điện thoại">
              <Input placeholder="Số điện thoại" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="date_of_birth"
              label="Ngày sinh"
              getValueProps={(value: string) => ({
                value: value && dayjs(value).tz("Asia/Ho_Chi_Minh"),
              })}
              normalize={(value: Dayjs) =>
                value ? value.tz("UTC", true).toISOString() : null
              }
            >
              <DatePicker
                placeholder="Chọn ngày sinh"
                format={"DD/MM/YYYY"}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="gender" label="Giới tính">
              <Select placeholder="Chọn giới tính" options={GENDER} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="generation" label="Thế hệ">
              <Input placeholder="Thế hệ" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="school" label="Trường học">
              <Input placeholder="Trường học" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="major" label="Ngành học">
              <Input placeholder="Ngành học" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="job_title" label="Nghề nghiệp">
              <Input placeholder="Nghề nghiệp" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="company" label="Công ty">
              <Input placeholder="Cônng ty" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="is_external_guest" label="Khách mời">
              <Select
                placeholder="Khách mời"
                options={[
                  { label: "Là khách mời", value: true },
                  { label: "Không là khách mời", value: false },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ModalUpdateUser;

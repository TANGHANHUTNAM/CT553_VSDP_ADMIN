import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useEffect } from "react";
import { FaSave } from "react-icons/fa";
import { GENDER } from "../../constants/tableManagement";
import {
  IDataUserUpdateProfileRequest,
  IUsersResponse,
} from "../../interfaces";
import { updateProfileService } from "../../services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface IUpdateProfileProps {
  dataUserProfile: IUsersResponse | null;
}

const UpdateProfile: React.FC<IUpdateProfileProps> = ({ dataUserProfile }) => {
  const queryClient = useQueryClient();
  const [formUserUpdate] = Form.useForm();
  useEffect(() => {
    if (dataUserProfile) {
      formUserUpdate.setFieldsValue({
        ...dataUserProfile,
      });
    }
  }, [dataUserProfile, formUserUpdate]);

  const mutationUpdateProfile = useMutation({
    mutationFn: async (data: IDataUserUpdateProfileRequest) => {
      return updateProfileService(data);
    },
    onSuccess: (data) => {
      if (data && data.data) {
        queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
        toast.success(data.message as string);
      }
      if (data && data.error) {
        toast.error(data.message as string);
      }
    },
  });

  const onUpdateProfile = (data: IDataUserUpdateProfileRequest) => {
    mutationUpdateProfile.mutate(data);
  };
  return (
    <Form
      layout="vertical"
      style={{ marginTop: "20px" }}
      initialValues={{
        status: "Active",
      }}
      form={formUserUpdate}
      disabled={mutationUpdateProfile.isPending}
      onFinish={onUpdateProfile}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Họ tên" name="name">
            <Input placeholder="Họ tên" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Số điện thoại" name="phone_number">
            <Input placeholder="Số điện thoại" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Giới tính" name="gender">
            <Select options={GENDER} placeholder="Chọn giới tính" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Ngày sinh"
            name="date_of_birth"
            getValueProps={(value: string) => ({
              value: value && dayjs(value).tz("Asia/Ho_Chi_Minh"),
            })}
            normalize={(value: Dayjs) =>
              value ? value.tz("UTC", true).toISOString() : null
            }
          >
            <DatePicker
              format={"DD/MM/YYYY"}
              placeholder="Chọn ngày sinh"
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Thế hệ" name="generation">
            <Input placeholder="Thế hệ" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Ngành học" name="major">
            <Input placeholder="Ngành học" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Trường học" name="school">
            <Input placeholder="Trường học" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Nghề nghiệp" name="job_title">
            <Input placeholder="Nghề nghiệp" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Công ty" name="company">
            <Input placeholder="Công ty" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16} justify="center">
        <Col>
          <Button
            loading={mutationUpdateProfile.isPending}
            size="large"
            icon={<FaSave />}
            htmlType="submit"
            type="primary"
          >
            Cập nhật thông tin
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default UpdateProfile;

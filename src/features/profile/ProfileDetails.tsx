import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import { useEffect } from "react";
import { GENDER } from "../../constants/tableManagement";
import { IUsersResponse } from "../../interfaces";
import dayjs, { Dayjs } from "dayjs";
import { formatDate } from "../../utils/functionUtils";
interface IProfileDetailsProps {
  dataUserProfile: IUsersResponse | null;
}

const ProfileDetails: React.FC<IProfileDetailsProps> = ({
  dataUserProfile,
}) => {
  const [formUserDetail] = Form.useForm();
  useEffect(() => {
    if (dataUserProfile) {
      formUserDetail.setFieldsValue({
        ...dataUserProfile,
        role: dataUserProfile.role?.name,
        created_at: formatDate(dataUserProfile.created_at),
        role_description: dataUserProfile.role?.description,
      });
    }
  }, [dataUserProfile, formUserDetail]);

  return (
    <Form
      layout="vertical"
      style={{ marginTop: "20px" }}
      initialValues={{
        status: "Active",
      }}
      form={formUserDetail}
      className="!pointer-events-none"
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Họ tên" name="name">
            <Input readOnly placeholder="Họ tên" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Số điện thoại" name="phone_number">
            <Input readOnly placeholder="Số điện thoại" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Giới tính" name="gender">
            <Select
              options={GENDER}
              placeholder="Chọn giới tính"
              className="!pointer-events-none cursor-default"
            />
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
              className="!pointer-events-none cursor-default"
              readOnly
              inputReadOnly
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
            <Input readOnly placeholder="Thế hệ" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Vai trò" name="role">
            <Input readOnly placeholder="Vai trò" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Mô tả vai trò" name="role_description">
            <Input readOnly placeholder="Mô tả vai trò" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Ngành học" name="major">
            <Input readOnly placeholder="Ngành học" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Trường học" name="school">
            <Input readOnly placeholder="Trường học" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Nghề nghiệp" name="job_title">
            <Input readOnly placeholder="Nghề nghiệp" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Công ty" name="company">
            <Input readOnly placeholder="Công ty" />
          </Form.Item>
        </Col>
      </Row>

      {/* Status */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Khách mời" name="is_external_guest">
            <Select
              className="!pointer-events-none cursor-default"
              options={[
                {
                  label: "Khách mời",
                  value: true,
                },
                {
                  label: "Không phải khách mời",
                  value: false,
                },
              ]}
              placeholder="Khách mời"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Ngày được cấp tài khoản" name="created_at">
            <Input readOnly placeholder="Ngày được cấp tài khoản" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default ProfileDetails;

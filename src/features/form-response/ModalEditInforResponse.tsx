import { useState } from "react";
import EditComponent from "../../components/EditComponent";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Upload,
} from "antd";
import { IDataFormSectionResponse, IFormResponse } from "../../interfaces";
import {
  FormBlockInstance,
  FormNotInputBlockTypes,
} from "../../interfaces/form-block";
import dayjs from "dayjs";
import { BiUpload } from "react-icons/bi";

interface IModalEditInforResponseProps {
  record: any;
  formResponse: IFormResponse | undefined;
}

const ModalEditInforResponse: React.FC<IModalEditInforResponseProps> = ({
  record,
  formResponse,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);

  const handleFinish = async (values: any) => {
    console.log("values", values);
    try {
      const updatedData = {
        form_response_id: record.id,
        name: values.name,
        email: values.email,
        phone_number: values.phone_number,
        university:
          formResponse?.scope === "SCHOLARSHIP"
            ? formResponse?.universities?.map((un) =>
                un.name === values.university ? un.id : undefined,
              )
            : undefined,
        field_value_responses: Object.keys(values)
          .filter((key) => key.startsWith("field_"))
          .map((key) => ({
            field_id: key.replace("field_", ""),
            value: values[key],
          })),
      };
      console.log("updatedData", updatedData);
    } catch (error) {
      console.error(error);
    }
  };
  const initialValues = {
    name: record.name,
    email: record.email,
    phone_number: record.phone_number,
    ...formResponse?.form_sections
      ?.flatMap((section: IDataFormSectionResponse) => section.json_blocks)
      ?.flatMap((block) => block.childBlock || [])
      ?.filter((block) => !FormNotInputBlockTypes.includes(block.blockType))
      ?.reduce((acc, block: FormBlockInstance) => {
        const fieldKey = `${block.id}`;
        let value = record[block.id];
        if (block.blockType === "DatePicker" && value) {
          value = dayjs(value);
        } else if (block.blockType === "RangePicker" && Array.isArray(value)) {
          value = value.map((date: string) => dayjs(date));
        }
        return { ...acc, [fieldKey]: value };
      }, {}),
  };
  const renderInputField = (block: FormBlockInstance) => {
    switch (block.blockType) {
      case "InputText":
      case "TextArea":
        return <Input />;
      case "InputNumber":
        return <InputNumber min={0} style={{ width: "100%" }} />;
      case "CheckBox":
        return (
          <Checkbox.Group
            options={(block.attributes?.options || []).map((opt: string) => ({
              label: opt,
              value: opt,
            }))}
          />
        );
      case "SelectOption":
      case "RadioSelect":
        return (
          <Select style={{ width: "100%" }}>
            {(block.attributes?.options || []).map((opt: string) => (
              <Option key={opt} value={opt}>
                {opt}
              </Option>
            ))}
          </Select>
        );
      case "DatePicker":
        return <DatePicker style={{ width: "100%" }} />;
      case "RangePicker":
        return <DatePicker.RangePicker style={{ width: "100%" }} />;
      case "Uploader":
        return (
          <Upload
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
            beforeUpload={() => false}
          >
            <Button icon={<BiUpload />}>Tải lên tệp</Button>
          </Upload>
        );
      default:
        return <Input disabled />;
    }
  };
  return (
    <>
      <EditComponent
        titleTooltip="Chỉnh sửa"
        onClick={() => {
          setOpen(true);
        }}
      />
      <Modal
        width={800}
        open={open}
        title={`Chỉnh sửa thông tin: ${record?.name || ""}`}
        onCancel={() => setOpen(false)}
        footer={null}
        afterOpenChange={(visible) => {
          if (!visible) {
            form.resetFields();
            setFileList([]);
          }
          if (visible) {
            form.setFieldsValue(initialValues);
          }
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={initialValues}
        >
          <div className="max-h-[60vh] overflow-y-auto">
            <Form.Item
              name="name"
              label="Họ tên"
              rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone_number"
              label="Số điện thoại"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
              ]}
            >
              <Input />
            </Form.Item>

            {formResponse?.form_sections
              ?.flatMap(
                (section: IDataFormSectionResponse) => section.json_blocks,
              )
              ?.flatMap((block) => block.childBlock || [])
              ?.filter(
                (block) => !FormNotInputBlockTypes.includes(block.blockType),
              )
              ?.map((block: FormBlockInstance) => (
                <Form.Item
                  key={block.id}
                  name={`${block.id}`}
                  label={block.attributes?.label || "Không có nhãn"}
                >
                  {renderInputField(block)}
                </Form.Item>
              ))}

            <Form.Item>
              <div className="flex justify-end space-x-2">
                <Button onClick={() => setOpen(false)}>Hủy</Button>
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
              </div>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default ModalEditInforResponse;

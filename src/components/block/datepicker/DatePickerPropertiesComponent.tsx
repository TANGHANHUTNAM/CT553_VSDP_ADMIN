import { useContext, useEffect } from "react";
import { FormBlockInstance } from "../../../interfaces/form-block";
import {
  DatePickerAttributesType,
  NewInstanceDatePicker,
} from "./DatePickerBlock";
import { BuilderContext } from "../../../context/form-builder/BuilderContext";
import { DatePicker, Form, Input, Select, Switch } from "antd";
import { OPTIONS_SIZE_INPUT } from "../../../constants/builderForm";

const DatePickerPropertiesComponent = ({
  positionIndex,
  parentId,
  blockInstance,
}: {
  positionIndex?: number;
  parentId?: string;
  blockInstance: FormBlockInstance;
}) => {
  const block = blockInstance as NewInstanceDatePicker;
  const { updateChildBlock } = useContext(BuilderContext);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      label: block.attributes.label,
      helperText: block.attributes.helperText,
      required: block.attributes.required,
      placeHolder: block.attributes.placeHolder,
      dateFormat: block.attributes.dateFormat,
      minDate: block.attributes.minDate,
      maxDate: block.attributes.maxDate,
      size: block.attributes.size,
    });
  }, [block.attributes, form]);

  const onValuesChange = (_: unknown, allValues: DatePickerAttributesType) => {
    if (!parentId) return;

    updateChildBlock(parentId, block.id, {
      ...block,
      attributes: {
        ...block.attributes,
        ...allValues,
      },
    });
  };
  return (
    <div className="mb-3 w-full">
      <div className="mb-3 flex h-auto w-full justify-between gap-1">
        <span className="text-lg font-medium">DatePicker {positionIndex}</span>
      </div>
      <Form
        form={form}
        layout="horizontal"
        onValuesChange={onValuesChange}
        initialValues={{
          label: block.attributes.label,
          helperText: block.attributes.helperText,
          required: block.attributes.required,
          placeHolder: block.attributes.placeHolder,
          dateFormat: block.attributes.dateFormat,
          minDate: block.attributes.minDate,
          maxDate: block.attributes.maxDate,
          size: block.attributes.size,
        }}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 17 }}
        labelAlign="left"
        validateTrigger={["onChange", "onBlur"]}
      >
        <Form.Item
          label="Label"
          name="label"
          rules={[
            { required: true, message: "Label là bắt buộc" },
            { min: 3, message: "Label phải có ít nhất 3 ký tự" },
            { max: 255, message: "Label phải có tối đa 255 ký tự" },
          ]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label="Helper Text"
          name="helperText"
          rules={[
            { required: false },
            { max: 255, message: "Helper text phải có tối đa 255 ký tự" },
          ]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label="Place Holder"
          name="placeHolder"
          rules={[
            { required: false },
            {
              max: 255,
              message: "Place holder phải có tối đa 255 ký tự",
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label="Date Format"
          name="dateFormat"
          rules={[{ required: false }]}
        >
          <Select
            options={[
              { label: "DD/MM/YYYY", value: "DD/MM/YYYY" },
              { label: "MM/DD/YYYY", value: "MM/DD/YYYY" },
              { label: "YYYY/MM/DD", value: "YYYY/MM/DD" },
              { label: "DD-MM-YYYY", value: "DD-MM-YYYY" },
              { label: "MM-DD-YYYY", value: "MM-DD-YYYY" },
              { label: "YYYY-MM-DD", value: "YYYY-MM-DD" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Min Date"
          name="minDate"
          rules={[{ required: false }]}
        >
          <DatePicker
            allowClear
            className="w-full"
            placeholder="Chọn ngày tối thiểu"
            format={form.getFieldValue("dateFormat")}
          />
        </Form.Item>

        <Form.Item
          label="Max Date"
          name="maxDate"
          rules={[
            { required: false },
            {
              validator: async (_, value) => {
                if (
                  value &&
                  form.getFieldValue("minDate") &&
                  value <= form.getFieldValue("minDate")
                ) {
                  return Promise.reject(
                    "Ngày tối đa phải lớn hơn ngày tối thiểu",
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <DatePicker
            allowClear
            className="w-full"
            placeholder="Chọn ngày tối đa"
            format={form.getFieldValue("dateFormat")}
          />
        </Form.Item>

        <Form.Item label="Size" name="size" rules={[{ required: false }]}>
          <Select options={OPTIONS_SIZE_INPUT} />
        </Form.Item>
        <Form.Item
          label="Required"
          name="required"
          valuePropName="checked"
          rules={[{ required: false }]}
        >
          <Switch size="small" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default DatePickerPropertiesComponent;

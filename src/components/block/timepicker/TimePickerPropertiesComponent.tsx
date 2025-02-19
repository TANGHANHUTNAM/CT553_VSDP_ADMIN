import { useContext, useEffect } from "react";
import { FormBlockInstance } from "../../../interfaces/form-block";
import {
  NewInstanceTimePicker,
  TimePickerAttributesType,
} from "./TimePickerBlock";
import { BuilderContext } from "../../../context/form-builder/BuilderContext";
import { Form, Input, Select, Switch } from "antd";
import { OPTIONS_SIZE_INPUT } from "../../../constants/builderForm";

const TimePickerPropertiesComponent = ({
  positionIndex,
  parentId,
  blockInstance,
}: {
  positionIndex?: number;
  parentId?: string;
  blockInstance: FormBlockInstance;
}) => {
  const block = blockInstance as NewInstanceTimePicker;
  const { updateChildBlock } = useContext(BuilderContext);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      label: block.attributes.label,
      helperText: block.attributes.helperText,
      required: block.attributes.required,
      placeHolder: block.attributes.placeHolder,
      formatTime: block.attributes.formatTime,
      size: block.attributes.size,
    });
  }, [block.attributes, form]);

  const onValuesChange = (_: unknown, allValues: TimePickerAttributesType) => {
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
        <span className="text-lg font-medium">TimePicker {positionIndex}</span>
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
          formatTime: block.attributes.formatTime,
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
            { required: true, message: "Label is required" },
            { min: 3, message: "Label must be at least 3 characters" },
            { max: 255, message: "Label must be at most 255 characters" },
          ]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label="Helper Text"
          name="helperText"
          rules={[
            { required: false },
            { max: 255, message: "Helper text must be at most 255 characters" },
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
              message: "Place holder must be at most 255 characters",
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label="Date Format"
          name="formatTime"
          rules={[{ required: false }]}
        >
          <Select
            options={[
              { label: "HH", value: "HH" },
              { label: "HH:mm", value: "HH:mm" },
              { label: "HH:mm:ss", value: "HH:mm:ss" },
            ]}
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

export default TimePickerPropertiesComponent;

import { useContext, useEffect } from "react";
import { FormBlockInstance } from "../../../interfaces/form-block";
import { Form, Input, InputNumber, Select, Switch } from "antd";
import { BuilderContext } from "../../../context/form-builder/BuilderContext";
import {
  InputTextAttributesType,
  NewInstanceInputText,
} from "./InputTextBlock";
import { OPTIONS_SIZE_INPUT } from "../../../constants/builderForm";

const InputTextPropertiesComponent = ({
  positionIndex,
  parentId,
  blockInstance,
}: {
  positionIndex?: number;
  parentId?: string;
  blockInstance: FormBlockInstance;
}) => {
  const block = blockInstance as NewInstanceInputText;
  const { updateChildBlock } = useContext(BuilderContext);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      label: block.attributes.label,
      helperText: block.attributes.helperText,
      required: block.attributes.required,
      placeHolder: block.attributes.placeHolder,
      min: block.attributes.min,
      max: block.attributes.max,
      type: block.attributes.type,
      size: block.attributes.size,
      prefix: block.attributes.prefix,
      suffix: block.attributes.suffix,
    });
  }, [block.attributes, form]);

  const onValuesChange = (_: unknown, allValues: InputTextAttributesType) => {
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
        <span className="text-lg font-medium">Input Text {positionIndex}</span>
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
          min: block.attributes.min,
          max: block.attributes.max,
          type: block.attributes.type,
          size: block.attributes.size,
          prefix: block.attributes.prefix,
          suffix: block.attributes.suffix,
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
        <Form.Item label="Type" name="type" rules={[{ required: false }]}>
          <Select
            options={[
              { label: "Text", value: "string" },
              { label: "Email", value: "email" },
              { label: "Number", value: "number" },
              { label: "Boolean", value: "boolean" },
              { label: "Url", value: "url" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Min" name="min" rules={[{ required: false }]}>
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          label="Max"
          name="max"
          rules={[
            { required: false },
            {
              validator: async (_, value) => {
                if (value <= form.getFieldValue("min")) {
                  return Promise.reject("Max must be greater than min");
                }
              },
            },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item label="Size" name="size" rules={[{ required: false }]}>
          <Select options={OPTIONS_SIZE_INPUT} />
        </Form.Item>

        <Form.Item label="Prefix" name="prefix" rules={[{ required: false }]}>
          <Input allowClear />
        </Form.Item>
        <Form.Item label="Suffix" name="suffix" rules={[{ required: false }]}>
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label="ReadOnly"
          name="readOnly"
          valuePropName="checked"
          rules={[{ required: false }]}
        >
          <Switch size="small" />
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

export default InputTextPropertiesComponent;

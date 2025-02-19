import { Form, Input, Select, Switch } from "antd";
import { useContext, useEffect } from "react";
import { OPTIONS_SIZE_INPUT } from "../../../constants/builderForm";
import { BuilderContext } from "../../../context/form-builder/BuilderContext";
import { FormBlockInstance } from "../../../interfaces/form-block";
import {
  InputNumberAttributesType,
  NewInstanceInputNumber,
} from "./InputNumberBlock";

const InputNumberPropertiesComponent = ({
  positionIndex,
  parentId,
  blockInstance,
}: {
  positionIndex?: number;
  parentId?: string;
  blockInstance: FormBlockInstance;
}) => {
  const block = blockInstance as NewInstanceInputNumber;
  const { updateChildBlock } = useContext(BuilderContext);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      label: block.attributes.label,
      helperText: block.attributes.helperText,
      required: block.attributes.required,
      placeHolder: block.attributes.placeHolder,
      size: block.attributes.size,
      prefix: block.attributes.prefix,
      suffix: block.attributes.suffix,
      fixed: block.attributes.fixed,
    });
  }, [block.attributes, form]);

  const onValuesChange = (_: unknown, allValues: InputNumberAttributesType) => {
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
        <span className="text-lg font-medium">
          Input Number {positionIndex}
        </span>
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
          prefix: block.attributes.prefix,
          suffix: block.attributes.suffix,
          fixed: block.attributes.fixed,
          size: block.attributes.size,
        }}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 17 }}
        labelAlign="left"
      >
        <Form.Item
          label="Label"
          name="label"
          validateTrigger={["onChange", "onBlur"]}
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
          validateTrigger={["onChange", "onBlur"]}
          rules={[
            { required: false },
            {
              max: 255,
              message: "Helper text must be at most 255 characters",
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label="Place Holder"
          name="placeHolder"
          validateTrigger={["onChange", "onBlur"]}
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
        <Form.Item label="Size" name="size" rules={[{ required: false }]}>
          <Select options={OPTIONS_SIZE_INPUT} />
        </Form.Item>
        <Form.Item
          label="Prefix"
          name="prefix"
          validateTrigger={["onChange", "onBlur"]}
          rules={[
            { required: false },
            {
              max: 255,
              message: "Prefix text must be at most 255 characters",
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label="Suffix"
          name="suffix"
          validateTrigger={["onChange", "onBlur"]}
          rules={[
            { required: false },
            {
              max: 255,
              message: "Suffix text must be at most 255 characters",
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label="Fixed"
          name="fixed"
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

export default InputNumberPropertiesComponent;

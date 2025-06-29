import { Form, Input, InputNumber, Select, Switch } from "antd";
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
      min: block.attributes.min,
      max: block.attributes.max,
      precision: block.attributes.precision,
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
          min: block.attributes.min,
          max: block.attributes.max,
          precision: block.attributes.precision,
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
            { min: 3, message: "Label có ít nhất 3 ký tự" },
            { max: 255, message: "Label có tối đa 255 ký tự" },
          ]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label="Helper Text"
          name="helperText"
          rules={[
            { required: false },
            {
              max: 255,
              message: "Helper text có tối đa 255 ký tự",
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
              message: "Place holder có tối đa 255 ký tự",
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item label="Size" name="size" rules={[{ required: false }]}>
          <Select options={OPTIONS_SIZE_INPUT} />
        </Form.Item>
        <Form.Item
          label="Precision"
          name="precision"
          rules={[{ required: false }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="Min" name="min" rules={[{ required: false }]}>
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="Max" name="max" rules={[{ required: false }]}>
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          label="Prefix"
          name="prefix"
          rules={[
            { required: false },
            {
              max: 255,
              message: "Prefix có tối đa 255 ký tự",
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label="Suffix"
          name="suffix"
          rules={[
            { required: false },
            {
              max: 255,
              message: "Suffix có tối đa 255 ký tự",
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

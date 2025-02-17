import { useContext, useEffect } from "react";
import { BuilderContext } from "../../../context/form-builder/BuilderContext";
import { FormBlockInstance } from "../../../interfaces/form-block";
import { NewInstanceTextArea, TextAreaAttributesType } from "./TextAreaBlock";
import { Form, Input, InputNumber, Switch } from "antd";

const TextAreaPropertiesComponent = ({
  positionIndex,
  parentId,
  blockInstance,
}: {
  positionIndex?: number;
  parentId?: string;
  blockInstance: FormBlockInstance;
}) => {
  const block = blockInstance as NewInstanceTextArea;
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
      rows: block.attributes.rows,
    });
  }, [block.attributes, form]);

  const onValuesChange = (_: unknown, allValues: TextAreaAttributesType) => {
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
        <span className="text-lg font-medium">Text Area {positionIndex}</span>
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
          rows: block.attributes.rows,
        }}
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
        <Form.Item label="Rows" name="rows" rules={[{ required: false }]}>
          <InputNumber min={0} />
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

export default TextAreaPropertiesComponent;

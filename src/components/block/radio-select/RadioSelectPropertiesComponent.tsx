import { useContext, useEffect } from "react";
import { FormBlockInstance } from "../../../interfaces/form-block";
import {
  NewInstanceRadioSelect,
  RadioSelectAttributes,
} from "./RadioSelectBlock";
import { BuilderContext } from "../../../context/form-builder/BuilderContext";
import { Button, Form, Input, Space, Switch } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsPlusCircle } from "react-icons/bs";

const RadioSelectPropertiesComponent = ({
  positionIndex,
  parentId,
  blockInstance,
}: {
  positionIndex?: number;
  parentId?: string;
  blockInstance: FormBlockInstance;
}) => {
  const block = blockInstance as NewInstanceRadioSelect;
  const { updateChildBlock } = useContext(BuilderContext);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      label: block.attributes.label,
      options: block.attributes.options || [],
      required: block.attributes.required,
    });
  }, [block.attributes, form]);
  const onValuesChange = (_: unknown, allValues: RadioSelectAttributes) => {
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
        <span className="text-lg font-medium"> Radio {positionIndex}</span>
      </div>
      <Form
        form={form}
        layout="horizontal"
        onValuesChange={onValuesChange}
        initialValues={{
          label: block.attributes.label,
          options: block.attributes.options || [],
          required: block.attributes.required,
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

        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    marginBottom: 8,
                    justifyContent: "center",
                  }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name]}
                    key={key}
                    rules={[{ required: true, message: "Option is required" }]}
                  >
                    <Input placeholder="Enter an option" allowClear />
                  </Form.Item>
                  <Button
                    type="default"
                    icon={<RiDeleteBin6Line />}
                    onClick={() => {
                      remove(name);
                      onValuesChange({}, form.getFieldsValue());
                    }}
                    danger
                  />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add(`Option ${fields.length + 1}`)}
                  block
                  icon={<BsPlusCircle />}
                >
                  Add Option
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item label="Inline" name="inline" valuePropName="checked">
          <Switch size="small" value={block.attributes.inline} />
        </Form.Item>

        <Form.Item label="Required" name="required" valuePropName="checked">
          <Switch size="small" value={block.attributes.required} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default RadioSelectPropertiesComponent;

import { Form, Input, Select } from "antd";
import { LinkAttributesType, NewInstanceLink } from "./LinkBlock";
import { useContext, useEffect } from "react";
import { BuilderContext } from "../../../context/form-builder/BuilderContext";
import { FormBlockInstance } from "../../../interfaces/form-block";

const LinkPropertiesComponent = ({
  positionIndex,
  parentId,
  blockInstance,
}: {
  positionIndex?: number;
  parentId?: string;
  blockInstance: FormBlockInstance;
}) => {
  const block = blockInstance as NewInstanceLink;
  const { updateChildBlock } = useContext(BuilderContext);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      label: block.attributes.label,
      text: block.attributes.text,
      href: block.attributes.href,
      target: block.attributes.target,
    });
  }, [block.attributes, form]);
  const onValuesChange = (_: unknown, allValues: LinkAttributesType) => {
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
        <span className="text-lg font-medium">Link {positionIndex}</span>
      </div>
      <Form
        form={form}
        layout="horizontal"
        onValuesChange={onValuesChange}
        initialValues={{
          label: block.attributes.label,
          text: block.attributes.text,
          href: block.attributes.href,
          target: block.attributes.target,
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
        <Form.Item label="Text" name="text">
          <Input allowClear />
        </Form.Item>
        <Form.Item label="Href" name="href">
          <Input allowClear />
        </Form.Item>
        <Form.Item label="Target" name="target">
          <Select
            options={[
              { label: "Open link in the current tab", value: "_self" },
              { label: "Open link in a new tab", value: "_blank" },
              { label: "Open link in the parent frame", value: "_parent" },
              { label: "Open link in the entire window", value: "_top" },
            ]}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default LinkPropertiesComponent;

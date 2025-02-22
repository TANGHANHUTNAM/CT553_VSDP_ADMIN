import { useContext, useEffect } from "react";
import { FormBlockInstance } from "../../../interfaces/form-block";
import {
  NewInstanceParagraph,
  ParagraphAttributesType,
} from "./ParagraphBlock";
import { BuilderContext } from "../../../context/form-builder/BuilderContext";
import { Form, Input, Select } from "antd";

const ParagraphPropertiesComponent = ({
  positionIndex,
  parentId,
  blockInstance,
}: {
  positionIndex?: number;
  parentId?: string;
  blockInstance: FormBlockInstance;
}) => {
  const block = blockInstance as NewInstanceParagraph;
  const { updateChildBlock } = useContext(BuilderContext);
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      text: block.attributes.text,
      fontSize: block.attributes.fontSize,
      fontWeight: block.attributes.fontWeight,
    });
  }, [block.attributes, form]);

  const onValuesChange = (_: unknown, allValues: ParagraphAttributesType) => {
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
        <span className="text-lg font-medium">Paragraph {positionIndex}</span>
      </div>
      <Form
        form={form}
        layout="horizontal"
        onValuesChange={onValuesChange}
        initialValues={{
          text: block.attributes.text,
          fontSize: block.attributes.fontSize,
          fontWeight: block.attributes.fontWeight,
        }}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 17 }}
        labelAlign="left"
      >
        <Form.Item
          label="Text"
          name="text"
          validateTrigger={["onChange", "onBlur"]}
          rules={[{ required: true, message: "Text là bắt buộc" }]}
        >
          <Input.TextArea rows={5} allowClear />
        </Form.Item>
        <Form.Item
          label="Font Size"
          name="fontSize"
          rules={[{ required: true, message: "Font Size là bắt buộc" }]}
        >
          <Select
            options={[
              {
                label: "Small",
                value: "text-sm",
              },
              {
                label: "Medium",
                value: "text-base",
              },
              {
                label: "Large",
                value: "text-lg",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Font Weight"
          name="fontWeight"
          rules={[{ required: true, message: "Font Weight là bắt buộc" }]}
        >
          <Select
            options={[
              {
                label: "Normal",
                value: "font-normal",
              },
              {
                label: "Bold",
                value: "font-bold",
              },
            ]}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default ParagraphPropertiesComponent;

import { Form, Input, Select, Switch } from "antd";
import { FormBlockInstance } from "../../../interfaces/form-block";
import { HeadingAttributesType, NewInstanceHeading } from "./HeadingBlock";
import { BuilderContext } from "../../../context/form-builder/BuilderContext";
import { useContext, useEffect } from "react";

const fontSizeOptions = [
  { value: "text-xs", label: "Extra Small" },
  { value: "text-sm", label: "Small" },
  { value: "text-base", label: "Base" },
  { value: "text-lg", label: "Large" },
  { value: "text-xl", label: "Extra Large" },
  { value: "text-2xl", label: "2X Large" },
  { value: "text-3xl", label: "3X Large" },
  { value: "text-4xl", label: "4X Large" },
  { value: "text-5xl", label: "5X Large" },
  { value: "text-6xl", label: "6X Large" },
  { value: "text-7xl", label: "7X Large" },
  { value: "text-8xl", label: "8X Large" },
  { value: "text-9xl", label: "9X Large" },
];

const fontWeightOptions = [
  { value: "font-thin", label: "Thin" },
  { value: "font-extralight", label: "Extra Light" },
  { value: "font-light", label: "Light" },
  { value: "font-normal", label: "Normal" },
  { value: "font-medium", label: "Medium" },
  { value: "font-semibold", label: "Semi Bold" },
  { value: "font-bold", label: "Bold" },
  { value: "font-extrabold", label: "Extra Bold" },
  { value: "font-black", label: "Black" },
];

const HeadingPropertiesComponent = ({
  positionIndex,
  parentId,
  blockInstance,
}: {
  positionIndex?: number;
  parentId?: string;
  blockInstance: FormBlockInstance;
}) => {
  const block = blockInstance as NewInstanceHeading;
  const { updateChildBlock } = useContext(BuilderContext);
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      label: block.attributes.label,
      fontSize: block.attributes.fontSize,
      fontWeight: block.attributes.fontWeight,
      uppercase: block.attributes.uppercase,
    });
  }, [block.attributes, form]);

  const onValuesChange = (_: unknown, allValues: HeadingAttributesType) => {
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
        <span className="text-lg font-medium">Header {positionIndex}</span>
      </div>
      <Form
        form={form}
        layout="horizontal"
        onValuesChange={onValuesChange}
        initialValues={{
          label: block.attributes.label,
          fontSize: block.attributes.fontSize,
          fontWeight: block.attributes.fontWeight,
          uppercase: block.attributes.uppercase,
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
            { required: true, message: "Label là bắt buộc" },
            { min: 3, message: "Label phải có ít nhất 3 ký tự" },
            { max: 255, message: "Label phải có tối đa 255 ký tự" },
          ]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label="Font Size"
          name="fontSize"
          rules={[{ required: true, message: "Font Size là bắt buộc" }]}
        >
          <Select options={fontSizeOptions} />
        </Form.Item>
        <Form.Item
          label="Font Weight"
          name="fontWeight"
          rules={[{ required: true, message: "Font Weight là bắt buộc" }]}
        >
          <Select options={fontWeightOptions} />
        </Form.Item>
        <Form.Item
          label="Uppercase"
          name="uppercase"
          rules={[{ required: true, message: "Font Weight là bắt buộc" }]}
        >
          <Switch size="small" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default HeadingPropertiesComponent;

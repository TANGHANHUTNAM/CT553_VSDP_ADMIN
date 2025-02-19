import { useContext, useEffect } from "react";
import { BuilderContext } from "../../../context/form-builder/BuilderContext";
import { FormBlockInstance } from "../../../interfaces/form-block";
import { NewInstanceUploader, UploaderAttributesType } from "./UploaderBlock";
import { Form, Input, InputNumber, Select, Switch } from "antd";
import { OPTIONS_SIZE_INPUT } from "../../../constants/builderForm";

const UploaderPropertiesComponent = ({
  positionIndex,
  parentId,
  blockInstance,
}: {
  positionIndex?: number;
  parentId?: string;
  blockInstance: FormBlockInstance;
}) => {
  const block = blockInstance as NewInstanceUploader;
  const { updateChildBlock } = useContext(BuilderContext);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      label: block.attributes.label,
      helperText: block.attributes.helperText,
      required: block.attributes.required,
      size: block.attributes.size,
      textButton: block.attributes.textButton,
      sizeMax: block.attributes.sizeMax,
      type: block.attributes.type,
      numberMax: block.attributes.numberMax,
    });
  }, [block.attributes, form]);

  const onValuesChange = (_: unknown, allValues: UploaderAttributesType) => {
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
        <span className="text-lg font-medium">Uploader {positionIndex}</span>
      </div>
      <Form
        form={form}
        layout="horizontal"
        onValuesChange={onValuesChange}
        initialValues={{
          label: block.attributes.label,
          helperText: block.attributes.helperText,
          required: block.attributes.required,
          size: block.attributes.size,
          textButton: block.attributes.textButton,
          sizeMax: block.attributes.sizeMax,
          type: block.attributes.type,
          numberMax: block.attributes.numberMax,
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
          label="Text Button"
          name="textButton"
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
          label="Max Files"
          name="numberMax"
          rules={[
            { required: true, message: "Max number of files is required" },
          ]}
        >
          <InputNumber min={1} max={10} suffix={"Files"} />
        </Form.Item>
        <Form.Item
          label="Max Size"
          name="sizeMax"
          rules={[{ required: true, message: "Max size is required" }]}
        >
          <InputNumber min={1} suffix={"MB"} />
        </Form.Item>
        <Form.Item label="Type Files" name="type">
          <Select
            mode="multiple"
            onChange={(value) => console.log("value", value)}
            options={[
              { label: "Image", value: "image/*" },
              { label: "PDF", value: "application/pdf" },
              { label: "Word", value: ".doc" },
              { label: "Excel", value: ".xls" },
              { label: "PowerPoint", value: ".ppt" },
              { label: "Video", value: "video/*" },
              { label: "Audio", value: "audio/*" },
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

export default UploaderPropertiesComponent;

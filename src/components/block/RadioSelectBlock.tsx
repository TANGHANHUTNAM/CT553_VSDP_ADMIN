import { Button, Form, Input, Radio, Space, Switch } from "antd";
import { useContext, useEffect } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { FaRegDotCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BuilderContext } from "../../context/form-builder/BuilderContext";
import {
  FormBlockInstance,
  FormBlockType,
  FormCategoryType,
  ObjectBlockType,
} from "../../interfaces/form-block";
import { generateUniqueId } from "../../utils/functionUtils";

const blockCategory: FormCategoryType = "Field";
const blockType: FormBlockType = "RadioSelect";

type RadioSelectAttributes = {
  label: string;
  options: string[];
  required: boolean;
};

export const RadioSelectBlock: ObjectBlockType = {
  blockCategory,
  blockType,
  blockBtnElement: {
    icon: FaRegDotCircle,
    label: "Radio group",
  },
  createInstance: (id: string) => {
    return {
      id: `field-${id}`,
      blockType,
      isLocked: false,
      attributes: {
        label: "Select an option",
        options: ["Option 1", "Option 2", "Option 3"],
        required: true,
      },
    };
  },
  canvasComponent: RadioSelectCanvasComponent,
  formComponent: RadioSelectFormComponent,
  propertiesComponent: RadioSelectPropertiesComponent,
};

type NewInstance = FormBlockInstance & {
  attributes: RadioSelectAttributes;
};

function RadioSelectCanvasComponent({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) {
  const block = blockInstance as NewInstance;
  const { label, options, required } = block.attributes;

  return (
    <div className="flex w-full flex-col gap-3">
      <label>{label}</label>
      {required && <span className="text-xs text-red-500">Required</span>}
      {/* <Radio.Group
        className="pointer-events-none flex flex-col gap-2"
        options={options.map((option) => ({
          label: option,
          value: option,
          key: generateUniqueId(),
        }))}
        size="large"
      /> */}
      {options.map((option) => (
        <div className="flex items-center gap-2" key={generateUniqueId()}>
          <Radio className="pointer-events-none" key={generateUniqueId()}>
            {option}
          </Radio>
        </div>
      ))}
    </div>
  );
}

function RadioSelectFormComponent() {
  return <div>RadioSelectFormComponent</div>;
}

function RadioSelectPropertiesComponent({
  positionIndex,
  parentId,
  blockInstance,
}: {
  positionIndex?: number;
  parentId?: string;
  blockInstance: FormBlockInstance;
}) {
  const block = blockInstance as NewInstance;
  const { updateChildBlock, blocksLayout } = useContext(BuilderContext);
  const [form] = Form.useForm();
  console.log("block", block);
  useEffect(() => {
    form.setFieldsValue({
      label: block.attributes.label,
      options: block.attributes.options || [],
      required: block.attributes.required,
    });
  }, [block.attributes, form]);
  const onValuesChange = (
    changedValues: any,
    allValues: RadioSelectAttributes,
  ) => {
    if (!parentId) return;
    console.log("changedValues", changedValues);
    console.log("allValues", allValues);

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
        <span className="text-sm font-medium">Radio {positionIndex}</span>
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
            { min: 2, message: "Label must be at least 2 characters" },
            { max: 255, message: "Label must be at most 255 characters" },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Trường nhập options động */}
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
                    <Input placeholder="Enter an option" />
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

        {/* Trường chọn required */}
        <Form.Item label="Required" name="required" valuePropName="checked">
          <Switch size="small" />
        </Form.Item>
      </Form>
    </div>
  );
}

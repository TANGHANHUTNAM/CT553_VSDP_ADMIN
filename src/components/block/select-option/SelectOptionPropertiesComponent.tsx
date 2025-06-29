import { useContext, useEffect } from "react";
import { FormBlockInstance } from "../../../interfaces/form-block";
import {
  NewInstanceSelectOption,
  SelectOptionAttributes,
} from "./SelectOption";
import { BuilderContext } from "../../../context/form-builder/BuilderContext";
import { Button, Form, Input, Select, Space, Switch } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsPlusCircle } from "react-icons/bs";
import {
  OPTIONS_SIZE_INPUT,
  PLACEMENT_OPTIONS,
} from "../../../constants/builderForm";

const SelectOptionPropertiesComponent = ({
  positionIndex,
  parentId,
  blockInstance,
}: {
  positionIndex?: number;
  parentId?: string;
  blockInstance: FormBlockInstance;
}) => {
  const block = blockInstance as NewInstanceSelectOption;
  const { updateChildBlock } = useContext(BuilderContext);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      label: block.attributes.label,
      options: block.attributes.options || [],
      required: block.attributes.required,
      placeHolder: block.attributes.placeHolder,
      placeMent: block.attributes.placeMent,
      size: block.attributes.size,
      showSearch: block.attributes.showSearch,
      helperText: block.attributes.helperText,
    });
  }, [block.attributes, form]);
  const onValuesChange = (_: unknown, allValues: SelectOptionAttributes) => {
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
        <span className="text-lg font-medium">Select {positionIndex}</span>
      </div>
      <Form
        form={form}
        layout="horizontal"
        onValuesChange={onValuesChange}
        initialValues={{
          label: block.attributes.label,
          options: block.attributes.options || [],
          required: block.attributes.required,
          placeHolder: block.attributes.placeHolder,
          placeMent: block.attributes.placeMent,
          size: block.attributes.size,
          showSearch: block.attributes.showSearch,
          helperText: block.attributes.helperText,
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
            { min: 3, message: "Label có ít nhất 3 ký tự" },
            { max: 255, message: "Label có tối đa 255 ký tự" },
          ]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          name="helperText"
          label="Helper Text"
          validateTrigger={["onChange", "onBlur"]}
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
        <Form.Item
          label="PlaceMent"
          name="placeMent"
          validateTrigger={["onChange", "onBlur"]}
          rules={[{ required: false }]}
        >
          <Select options={PLACEMENT_OPTIONS} />
        </Form.Item>

        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <Form.Item
                  key={key}
                  label={`Option ${index + 1}`}
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 17 }}
                  labelAlign="left"
                  required
                >
                  <Space
                    style={{ display: "flex", width: "100%" }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name]}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        { required: true, message: "Option là bắt buộc" },
                      ]}
                      style={{ flex: 1, marginBottom: 0 }}
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
                </Form.Item>
              ))}
              <Form.Item
                wrapperCol={{ span: 24 }}
                labelCol={{ span: 0 }}
                style={{ textAlign: "center" }}
              >
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
        <Form.Item label="Size" name="size" rules={[{ required: false }]}>
          <Select options={OPTIONS_SIZE_INPUT} />
        </Form.Item>
        <Form.Item
          label="Show Search"
          name="showSearch"
          valuePropName="checked"
        >
          <Switch size="small" value={block.attributes.showSearch} />
        </Form.Item>
        <Form.Item label="Required" name="required" valuePropName="checked">
          <Switch size="small" value={block.attributes.required} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default SelectOptionPropertiesComponent;

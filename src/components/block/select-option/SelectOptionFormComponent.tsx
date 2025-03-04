import { Form, Select } from "antd";
import { FormBlockInstance } from "../../../interfaces/form-block";
import { NewInstanceSelectOption } from "./SelectOption";

const SelectOptionFormComponent = ({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) => {
  const block = blockInstance as NewInstanceSelectOption;
  const {
    label,
    options,
    required,
    placeHolder,
    size,
    placeMent,
    showSearch,
    helperText,
  } = block.attributes;
  return (
    <div className="flex h-full w-full flex-col gap-3">
      <Form.Item
        colon={true}
        label={label}
        extra={helperText}
        htmlFor={block?.id}
        name={block?.id}
        rules={[{ required: required, message: `Vui lòng chọn ${label}` }]}
        className="w-2/3"
      >
        <Select
          size={size}
          allowClear
          showSearch={showSearch}
          placement={placeMent}
          placeholder={placeHolder}
        >
          {options.map((option, index) => (
            <Select.Option key={index} value={option}>
              {option}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  );
};

export default SelectOptionFormComponent;

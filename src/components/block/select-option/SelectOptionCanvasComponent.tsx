import { Form, Select } from "antd";
import { FormBlockInstance } from "../../../interfaces/form-block";
import { NewInstanceSelectOption } from "./SelectOption";

const SelectOptionCanvasComponent = ({
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
          showSearch={showSearch}
          allowClear
          placement={placeMent}
          placeholder={placeHolder}
          className="!pointer-events-none"
        >
          {options.map((option, index) => (
            <Select.Option key={index} value={`${option}-${index}`}>
              {option}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  );
};

export default SelectOptionCanvasComponent;

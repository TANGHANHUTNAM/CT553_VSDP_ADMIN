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
    <div className="flex w-full flex-col gap-3">
      <div className="text-base">
        <label className="font-medium">
          {label}
          {required && <span className="ml-1 text-base text-red-500">*</span>}
        </label>
        {helperText && <p className="mt-1 text-[0.9rem]">{helperText}</p>}
      </div>
      <Form validateTrigger={["onChange", "onBlur"]}>
        <Form.Item
          name={block?.id}
          rules={[{ required: required, message: `Please select ${label}` }]}
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
              <Select.Option key={index} value={`${option}-${index}`}>
                {option}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SelectOptionFormComponent;

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
    <div className="flex w-full flex-col gap-3">
      <div className="text-base">
        <label className={`font-me ${required ? "text-red-500" : ""}`}>
          {label}
          {required && <span className="ml-1 text-base text-red-500">*</span>}
        </label>
        {helperText && <p className="mt-1 text-[0.9rem]">{helperText}</p>}
      </div>
      <Form>
        <Form.Item
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
          >
            {options.map((option, index) => (
              <Select.Option
                className="!pointer-events-none"
                key={index}
                value={`${option}-${index}`}
              >
                {option}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SelectOptionCanvasComponent;

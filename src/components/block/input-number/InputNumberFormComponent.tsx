import { Form, InputNumber } from "antd";
import { FormBlockInstance } from "../../../interfaces/form-block";
import { NewInstanceInputNumber } from "./InputNumberBlock";
const InputNumberFormComponent = ({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) => {
  const block = blockInstance as NewInstanceInputNumber;
  const {
    helperText,
    label,
    placeHolder,
    required,
    size,
    suffix,
    prefix,
    fixed,
    max,
    min,
    precision,
  } = block.attributes;
  return (
    <div className="flex w-full flex-col gap-2">
      <Form.Item
        colon={true}
        label={label}
        extra={helperText}
        htmlFor={block?.id}
        name={block?.id}
        required={required}
        rules={[
          {
            required: required,
            message: `${label} là bắt buộc`,
          },
        ]}
      >
        <InputNumber
          size={size}
          prefix={prefix}
          suffix={suffix}
          variant="underlined"
          className="w-2/3"
          max={max}
          min={min}
          precision={precision}
          placeholder={placeHolder}
          formatter={(value) => {
            return fixed
              ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : (value as unknown as string);
          }}
          parser={(value) => {
            return fixed
              ? (value?.replace(/\$\s?|(,*)/g, "") as unknown as number)
              : (value as unknown as number);
          }}
        />
      </Form.Item>
    </div>
  );
};

export default InputNumberFormComponent;

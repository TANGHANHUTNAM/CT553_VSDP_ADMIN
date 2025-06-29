import { Form, InputNumber } from "antd";
import { FormBlockInstance } from "../../../interfaces/form-block";
import { NewInstanceInputNumber } from "./InputNumberBlock";

const InputNumberCanvasComponent = ({
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
          readOnly
          prefix={prefix}
          suffix={suffix}
          min={min}
          max={max}
          precision={precision}
          variant="underlined"
          className="!pointer-events-none w-2/3 cursor-default"
          placeholder={placeHolder}
          formatter={(value) => {
            if (fixed) return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return value ? value.toString() : "";
          }}
          parser={(value) => {
            if (fixed)
              return parseFloat(value?.replace(/\$\s?|(,*)/g, "") || "0");
            return value ? parseFloat(value.toString()) : 0;
          }}
        />
      </Form.Item>
    </div>
  );
};

export default InputNumberCanvasComponent;

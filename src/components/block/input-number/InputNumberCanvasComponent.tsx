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
  } = block.attributes;
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="mb-3 text-base">
        <label className={`font-medium ${required ? "text-red-500" : ""}`}>
          {label}
          {required && <span className="ml-1">*</span>}
        </label>
        {helperText && <p className="mt-1 text-[0.9rem]">{helperText}</p>}
      </div>
      <Form>
        <Form.Item
          name={block?.id}
          required={required}
          rules={[
            {
              required: required,
              message: `${label} is required`,
            },
          ]}
        >
          <InputNumber
            size={size}
            readOnly
            prefix={prefix}
            suffix={suffix}
            variant="underlined"
            className="!pointer-events-none w-2/3 cursor-default"
            placeholder={placeHolder}
            formatter={(value) => {
              if (fixed)
                return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              return value ? value.toString() : "";
            }}
            parser={(value) => {
              if (fixed)
                return parseFloat(value?.replace(/\$\s?|(,*)/g, "") || "0");
              return value ? parseFloat(value.toString()) : 0;
            }}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default InputNumberCanvasComponent;

import { Form, Input } from "antd";
import { FormBlockInstance } from "../../../interfaces/form-block";
import { NewInstanceInputText } from "./InputTextBlock";

const InputTextCanvasComponent = ({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) => {
  const block = blockInstance as NewInstanceInputText;
  const {
    helperText,
    label,
    placeHolder,
    required,
    min,
    max,
    type,
    size,
    prefix,
    suffix,
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
            {
              min: min,
              message: `${label} must be at least ${min} characters`,
            },
            {
              max: max,
              message: `${label} must be at most ${max} characters`,
            },
          ]}
        >
          {type === "Password" ? (
            <Input.Password
              size={size}
              allowClear
              readOnly
              autoComplete="new-password"
              variant="underlined"
              className="!pointer-events-none w-2/3 cursor-default"
              placeholder={placeHolder}
              prefix={prefix}
              suffix={suffix}
            />
          ) : (
            <Input
              size={size}
              allowClear
              readOnly
              variant="underlined"
              className="!pointer-events-none w-2/3 cursor-default"
              placeholder={placeHolder}
              prefix={prefix}
              suffix={suffix}
            />
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default InputTextCanvasComponent;

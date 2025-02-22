import { Form, Input } from "antd";
import { FormBlockInstance } from "../../../interfaces/form-block";
import { NewInstanceInputText } from "./InputTextBlock";

const InputTextFormComponent = ({
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
        <label className="font-medium">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
        {helperText && <p className="mt-1 text-[0.9rem]">{helperText}</p>}
      </div>
      <Form validateTrigger={["onChange", "onBlur"]}>
        <Form.Item
          validateTrigger="onBlur"
          name={block?.id}
          required={required}
          rules={[
            {
              required: required,
              message: `${label} là bắt buộc`,
            },
            ...(type === "Email"
              ? [
                  {
                    type: "email" as const,
                    message: "Email không hợp lệ",
                  },
                ]
              : []),
            ...(type === "Text" || type === "Password"
              ? [
                  {
                    min: min,
                    message: `${label} có ít nhất ${min} ký tự`,
                  },
                  {
                    max: max,
                    message: `${label} có nhiều nhất ${max} ký tự`,
                  },
                ]
              : []),
          ]}
        >
          {type === "Password" ? (
            <Input.Password
              size={size}
              allowClear
              autoComplete="new-password"
              variant="underlined"
              className="w-2/3"
              placeholder={placeHolder}
              prefix={prefix}
              suffix={suffix}
            />
          ) : (
            <Input
              size={size}
              allowClear
              variant="underlined"
              className="w-2/3"
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

export default InputTextFormComponent;

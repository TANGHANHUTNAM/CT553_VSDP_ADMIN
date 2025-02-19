import { Form, Input } from "antd";
import { FormBlockInstance } from "../../../interfaces/form-block";
import { NewInstanceInputText } from "./InputTextBlock";

const InputTextFormComponent = ({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) => {
  const block = blockInstance as NewInstanceInputText;
  const { helperText, label, placeHolder, required, min, max, type, size } =
    block.attributes;
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
              message: `${label} is required`,
            },
            ...(type === "Email"
              ? [
                  {
                    type: "email" as const,
                    message: "Please enter a valid email",
                  },
                ]
              : []),
            ...(type === "Text" || type === "Password"
              ? [
                  {
                    min: min,
                    message: `${label} must be at least ${min} characters`,
                  },
                  {
                    max: max,
                    message: `${label} must be at most ${max} characters`,
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
            />
          ) : (
            <Input
              size={size}
              allowClear
              variant="underlined"
              className="w-2/3"
              placeholder={placeHolder}
            />
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default InputTextFormComponent;

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
    readOnly,
  } = block.attributes;
  return (
    <div className="flex w-full flex-col gap-2">
      <Form.Item
        label={label}
        colon={true}
        extra={helperText}
        htmlFor={block?.id}
        validateTrigger={["onChange", "onBlur"]}
        name={block?.id}
        required={required}
        rules={[
          {
            required: required,
            message: `${label} là bắt buộc`,
          },
          {
            type: type,
            message: `${label} không đúng định dạng`,
          },
          {
            min: min,
            message: `${label} phải lớn hơn ${min}`,
          },
          {
            max: max,
            message: `${label} phải nhỏ hơn ${max}`,
          },
        ]}
      >
        <Input
          size={size}
          readOnly={readOnly}
          allowClear
          variant="underlined"
          className="w-2/3"
          placeholder={placeHolder}
          prefix={prefix}
          suffix={suffix}
        />
      </Form.Item>
    </div>
  );
};

export default InputTextFormComponent;

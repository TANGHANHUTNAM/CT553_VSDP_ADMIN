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
    readOnly,
  } = block.attributes;
  return (
    <div className="flex w-full flex-col gap-2">
      <Form.Item
        label={label}
        htmlFor={block?.id}
        colon={true}
        extra={helperText}
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
          allowClear
          readOnly={readOnly}
          variant="underlined"
          className="!pointer-events-none w-2/3 cursor-default"
          placeholder={placeHolder}
          prefix={prefix}
          suffix={suffix}
        />
      </Form.Item>
    </div>
  );
};

export default InputTextCanvasComponent;

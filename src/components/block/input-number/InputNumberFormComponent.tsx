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
      <div className="mb-3 text-base">
        <label className={`font-medium`}>
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
        {helperText && <p className="mt-1 text-[0.9rem]">{helperText}</p>}
      </div>
      <Form validateTrigger={["onChange", "onBlur"]}>
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
      </Form>
    </div>
  );
};

export default InputNumberFormComponent;

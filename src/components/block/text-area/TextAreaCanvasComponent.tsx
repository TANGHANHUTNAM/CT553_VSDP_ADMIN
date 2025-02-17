import { Form, Input } from "antd";
import { FormBlockInstance } from "../../../interfaces/form-block";
import { NewInstanceTextArea } from "./TextAreaBlock";

const TextAreaCanvasComponent = ({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) => {
  const block = blockInstance as NewInstanceTextArea;
  const { label, placeHolder, required, helperText, rows, max, min } =
    block.attributes;
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="mb-3 text-base">
        <label className={`font-medium ${required ? "text-red-500" : ""}`}>
          {label}
          {required && <span className="ml-1">*</span>}
        </label>
        {helperText && <p className="mt-1 text-[0.8rem]">{helperText}</p>}
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
          <Input.TextArea
            rows={rows}
            size="large"
            allowClear
            readOnly
            className="!pointer-events-none cursor-default"
            placeholder={placeHolder}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default TextAreaCanvasComponent;

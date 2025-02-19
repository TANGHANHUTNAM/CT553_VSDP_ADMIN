import { Form, Radio } from "antd";
import { FormBlockInstance } from "../../../interfaces/form-block";
import {
  NewInstanceRadioSelect,
  styleRadioSelectInline,
} from "./RadioSelectBlock";

const RadioSelectCanvasComponent = ({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) => {
  const block = blockInstance as NewInstanceRadioSelect;
  const { label, options, required, inline, helperText } = block.attributes;

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="text-base">
        <label className={`font-medium ${required ? "text-red-500" : ""}`}>
          {label}
          {required && <span className="ml-1 text-base text-red-500">*</span>}
        </label>
        {helperText && <p className="mt-1 text-[0.9rem]">{helperText}</p>}
      </div>
      <Form>
        <Form.Item
          name={block?.id}
          rules={[{ required: required, message: `Please select ${label}` }]}
        >
          <Radio.Group
            size="large"
            style={!inline ? styleRadioSelectInline : undefined}
          >
            {options.map((option, index) => (
              <Radio
                key={index}
                value={`${option}-${index}`}
                className="pointer-events-none"
              >
                {option}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RadioSelectCanvasComponent;

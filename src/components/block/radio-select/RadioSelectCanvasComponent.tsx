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
      <Form.Item
        colon={true}
        label={label}
        extra={helperText}
        htmlFor={block?.id}
        name={block?.id}
        rules={[{ required: required, message: `Vui lòng chọn ${label}` }]}
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
    </div>
  );
};

export default RadioSelectCanvasComponent;

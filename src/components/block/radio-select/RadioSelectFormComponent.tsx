import { Form, Radio } from "antd";
import { FormBlockInstance } from "../../../interfaces/form-block";
import {
  NewInstanceRadioSelect,
  styleRadioSelectInline,
} from "./RadioSelectBlock";
import { generateUniqueId } from "../../../utils/functionUtils";

const RadioSelectFormComponent = ({
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
        <Radio.Group style={!inline ? styleRadioSelectInline : undefined}>
          {options.map((option, index) => {
            const uniqueId = `option-${generateUniqueId()}`;
            return (
              <Radio id={uniqueId} key={index} value={option}>
                {option}
              </Radio>
            );
          })}
        </Radio.Group>
      </Form.Item>
    </div>
  );
};

export default RadioSelectFormComponent;

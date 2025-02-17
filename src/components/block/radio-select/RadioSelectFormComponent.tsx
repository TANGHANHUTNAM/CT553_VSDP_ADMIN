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
  const { label, options, required, inline } = block.attributes;

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="text-base">
        <label className="font-medium">
          {label}
          {required && <span className="ml-1 text-base text-red-500">*</span>}
        </label>
      </div>
      <Form>
        <Form.Item
          name={block?.id}
          rules={[{ required: required, message: `Please select ${label}` }]}
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
      </Form>
    </div>
  );
};

export default RadioSelectFormComponent;

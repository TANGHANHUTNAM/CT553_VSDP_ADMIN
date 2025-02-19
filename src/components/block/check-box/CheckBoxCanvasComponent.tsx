import { Checkbox, Form } from "antd";
import { FormBlockInstance } from "../../../interfaces/form-block";
import { NewInstanceCheckBox, styleCheckBoxInline } from "./CheckBoxBlock";

const CheckBoxCanvasComponent = ({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) => {
  const block = blockInstance as NewInstanceCheckBox;
  const { helperText, label, required, inline, options } = block.attributes;
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="mb-3 text-base">
        <label className={`font-medium ${required ? "text-red-500" : ""}`}>
          {label}
          {required && <span className="ml-1">*</span>}
        </label>
        {helperText && <p className="mt-1 text-[0.9rem]">{helperText}</p>}
      </div>
      <Form>
        <Form.Item
          name={block?.id}
          rules={[{ required: required, message: `Please select ${label}` }]}
        >
          <Checkbox.Group
            className="!pointer-events-none cursor-default"
            style={!inline ? styleCheckBoxInline : {}}
            options={options.map((option, index) => ({
              label: <div key={index}>{option}</div>,
              value: `${option}-${index}`,
            }))}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default CheckBoxCanvasComponent;

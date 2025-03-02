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
    <div className="flex h-full w-full flex-col gap-2">
      <Form.Item
        colon={true}
        label={label}
        htmlFor={block?.id}
        extra={helperText}
        name={block?.id}
        rules={[{ required: required, message: `Vui lòng chọn ${label}` }]}
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
    </div>
  );
};

export default CheckBoxCanvasComponent;

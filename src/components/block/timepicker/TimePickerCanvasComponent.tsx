import { Form, TimePicker } from "antd";
import { FormBlockInstance } from "../../../interfaces/form-block";
import { NewInstanceTimePicker } from "./TimePickerBlock";

const TimePickerCanvasComponent = ({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) => {
  const block = blockInstance as NewInstanceTimePicker;
  const { helperText, label, placeHolder, required, formatTime, size } =
    block.attributes;
  return (
    <div className="flex w-full flex-col gap-2">
      <Form.Item
        colon={true}
        label={label}
        extra={helperText}
        htmlFor={block?.id}
        name={block?.id}
        required={required}
        rules={[
          {
            required: required,
            message: `${label} là bắt buộc`,
          },
        ]}
      >
        <TimePicker
          readOnly={true}
          allowClear
          className="!pointer-events-none w-2/3 cursor-default"
          placeholder={placeHolder}
          format={formatTime}
          size={size}
        />
      </Form.Item>
    </div>
  );
};

export default TimePickerCanvasComponent;

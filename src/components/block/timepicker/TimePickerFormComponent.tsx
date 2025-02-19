import { Form, TimePicker } from "antd";
import { FormBlockInstance } from "../../../interfaces/form-block";
import { NewInstanceTimePicker } from "./TimePickerBlock";

const TimePickerFormComponent = ({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) => {
  const block = blockInstance as NewInstanceTimePicker;
  const { helperText, label, placeHolder, required, formatTime, size } =
    block.attributes;
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
          <TimePicker
            allowClear
            className="w-2/3"
            placeholder={placeHolder}
            format={formatTime}
            size={size}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default TimePickerFormComponent;

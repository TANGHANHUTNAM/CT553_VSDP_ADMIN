import { DatePicker, Form } from "antd";
import { FormBlockInstance } from "../../../interfaces/form-block";
import { NewInstanceDatePicker } from "./DatePickerBlock";
import dayjs from "dayjs";

const DatePickerCanvasComponent = ({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) => {
  const block = blockInstance as NewInstanceDatePicker;
  const {
    helperText,
    label,
    placeHolder,
    required,
    minDate,
    maxDate,
    dateFormat,
    size,
  } = block.attributes;
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="mb-3 text-base">
        <label className={`font-medium ${required ? "text-red-500" : ""}`}>
          {label}
          {required && <span className="ml-1">*</span>}
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
          <DatePicker
            readOnly={true}
            allowClear
            className="!pointer-events-none w-2/3 cursor-default"
            placeholder={placeHolder}
            format={dateFormat}
            minDate={dayjs(minDate, dateFormat)}
            maxDate={dayjs(maxDate, dateFormat)}
            size={size}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default DatePickerCanvasComponent;

import { DatePicker, Form } from "antd";
import { FormBlockInstance } from "../../../interfaces/form-block";
import { NewInstanceDatePicker } from "./DatePickerBlock";
import dayjs from "dayjs";

const DatePickerFormComponent = ({
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
        <DatePicker
          onChange={(e) => {
            console.log(e && e.toDate());
          }}
          allowClear
          className="w-2/3"
          placeholder={placeHolder}
          format={dateFormat}
          minDate={dayjs(minDate, dateFormat)}
          maxDate={dayjs(maxDate, dateFormat)}
          size={size}
        />
      </Form.Item>
    </div>
  );
};

export default DatePickerFormComponent;

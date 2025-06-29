import { DatePicker, Form } from "antd";
import dayjs from "dayjs";
import { FormBlockInstance } from "../../../interfaces/form-block";
import { NewInstanceRangePicker } from "./RangePickerBlock";

const { RangePicker } = DatePicker;

const RangePickerFormComponent = ({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) => {
  const block = blockInstance as NewInstanceRangePicker;
  const {
    helperText,
    label,
    placeHolderEndDate,
    placeHolderStartDate,
    required,
    minDate,
    maxDate,
    dateFormat,
    size,
  } = block.attributes;
  return (
    <div className="flex w-full flex-col gap-2">
      <Form.Item
        label={label}
        colon={true}
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
        <RangePicker
          allowClear
          className="w-2/3"
          format={dateFormat}
          placeholder={[placeHolderStartDate, placeHolderEndDate]}
          minDate={dayjs(minDate, dateFormat)}
          maxDate={dayjs(maxDate, dateFormat)}
          size={size}
        />
      </Form.Item>
    </div>
  );
};

export default RangePickerFormComponent;

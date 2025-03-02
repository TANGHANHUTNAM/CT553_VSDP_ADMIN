import { DatePicker, Form } from "antd";
import { FormBlockInstance } from "../../../interfaces/form-block";
import { NewInstanceRangePicker } from "./RangePickerBlock";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const RangePickerCanvasComponent = ({
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
          readOnly={true}
          allowClear
          className="!pointer-events-none w-2/3 cursor-default"
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

export default RangePickerCanvasComponent;

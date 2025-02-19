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
      </Form>
    </div>
  );
};

export default RangePickerFormComponent;

import { Dayjs } from "dayjs";
import { BsCalendar2Date } from "react-icons/bs";

import {
  FormBlockInstance,
  FormBlockType,
  FormCategoryType,
  ObjectBlockType,
} from "../../../interfaces/form-block";
import RangePickerCanvasComponent from "./RangePickerCanvasComponent";
import RangePickerFormComponent from "./RangePickerFormComponent";
import RangePickerPropertiesComponent from "./RangePickerPropertiesComponent";

const blockCategory: FormCategoryType = "Field";
const blockType: FormBlockType = "RangePicker";

export type RangePickerAttributesType = {
  label: string;
  helperText: string;
  required: boolean;
  placeHolderStartDate: string;
  placeHolderEndDate: string;
  dateFormat:
    | "DD/MM/YYYY"
    | "MM/DD/YYYY"
    | "YYYY/MM/DD"
    | "DD-MM-YYYY"
    | "MM-DD-YYYY"
    | "YYYY-MM-DD";
  minDate: Dayjs | undefined;
  maxDate: Dayjs | undefined;
  size: "large" | "middle" | "small";
};

export type NewInstanceRangePicker = FormBlockInstance & {
  attributes: RangePickerAttributesType;
};

export const RangePickerBlock: ObjectBlockType = {
  blockType,
  blockCategory,
  createInstance: (id: string) => ({
    id,
    blockType,
    attributes: {
      label: "RangePicker",
      helperText: "Helper Text",
      required: true,
      placeHolderStartDate: "Choose start date",
      placeHolderEndDate: "Choose end date",
      dateFormat: "DD/MM/YYYY",
      minDate: undefined,
      maxDate: undefined,
      size: "middle",
    },
  }),
  blockBtnElement: {
    icon: BsCalendar2Date,
    label: "RangePicker",
  },
  canvasComponent: RangePickerCanvasComponent,
  formComponent: RangePickerFormComponent,
  propertiesComponent: RangePickerPropertiesComponent,
};

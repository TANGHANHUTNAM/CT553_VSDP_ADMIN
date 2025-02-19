import {
  FormBlockInstance,
  FormBlockType,
  FormCategoryType,
  ObjectBlockType,
} from "../../../interfaces/form-block";
import { GoNumber } from "react-icons/go";
import InputNumberCanvasComponent from "./InputNumberCanvasComponent";
import InputNumberFormComponent from "./InputNumberFormComponent";
import InputNumberPropertiesComponent from "./InputNumberPropertiesComponent";

const blockCategory: FormCategoryType = "Field";
const blockType: FormBlockType = "InputNumber";

export type InputNumberAttributesType = {
  label: string;
  helperText: string;
  required: boolean;
  placeHolder: string;
  size: "small" | "middle" | "large";
  prefix: string;
  suffix: string;
  fixed: boolean;
  min: number;
  max: number;
  precision: number;
};

export type NewInstanceInputNumber = FormBlockInstance & {
  attributes: InputNumberAttributesType;
};

export const InputNumberBlock: ObjectBlockType = {
  blockType,
  blockCategory,
  createInstance: (id: string) => ({
    id,
    blockType,
    attributes: {
      label: "Input Number",
      helperText: "Helper Text",
      required: true,
      placeHolder: "Enter text here.",
      size: "middle",
      prefix: "",
      suffix: "",
      fixed: true,
      min: 0,
      max: 100,
      precision: 0,
    },
  }),
  blockBtnElement: {
    icon: GoNumber,
    label: "Input Number",
  },
  canvasComponent: InputNumberCanvasComponent,
  formComponent: InputNumberFormComponent,
  propertiesComponent: InputNumberPropertiesComponent,
};

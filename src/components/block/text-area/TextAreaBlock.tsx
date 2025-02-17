import {
  FormBlockInstance,
  FormBlockType,
  FormCategoryType,
  ObjectBlockType,
} from "../../../interfaces/form-block";
import TextAreaCanvasComponent from "./TextAreaCanvasComponent";
import TextAreaFormComponent from "./TextAreaFormComponent";
import TextAreaPropertiesComponent from "./TextAreaPropertiesComponent";
import { BsTextareaT } from "react-icons/bs";

const blockCategory: FormCategoryType = "Field";
const blockType: FormBlockType = "TextArea";

export type TextAreaAttributesType = {
  label: string;
  helperText: string;
  required: boolean;
  placeHolder: string;
  min: number;
  max: number;
  rows: number;
};

export type NewInstanceTextArea = FormBlockInstance & {
  attributes: TextAreaAttributesType;
};

export const TextAreaBlock: ObjectBlockType = {
  blockType,
  blockCategory,
  createInstance: (id: string) => ({
    id,
    blockType,
    attributes: {
      label: "Text Area",
      helperText: "Helper Text",
      required: true,
      placeHolder: "Enter text here.",
      rows: 3,
      min: 0,
      max: 255,
    },
  }),
  blockBtnElement: {
    icon: BsTextareaT,
    label: "Text Area",
  },
  canvasComponent: TextAreaCanvasComponent,
  formComponent: TextAreaFormComponent,
  propertiesComponent: TextAreaPropertiesComponent,
};

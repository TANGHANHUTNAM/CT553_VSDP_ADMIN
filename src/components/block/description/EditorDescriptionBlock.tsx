import {
  FormBlockInstance,
  FormBlockType,
  FormCategoryType,
  ObjectBlockType,
} from "../../../interfaces/form-block";
import { BiCommentEdit } from "react-icons/bi";
import EditorDescriptionCanvasComponent from "./EditorDescriptionCanvasComponent";
import EditorDescriptionFormComponent from "./EditorDescriptionFormComponent";
import EditorDescriptionPropertiesComponent from "./EditorDescriptionPropertiesComponent";

const blockCategory: FormCategoryType = "Field";
const blockType: FormBlockType = "EditorDescription";

export type EditorDescriptionAttributesType = {
  label: string;
  helperText: string;
  required: boolean;
  placeHolder: string;
};

export type NewInstanceEditorDescription = FormBlockInstance & {
  attributes: EditorDescriptionAttributesType;
};

export const EditorDescriptionBlock: ObjectBlockType = {
  blockType,
  blockCategory,
  createInstance: (id: string) => ({
    id,
    blockType,
    attributes: {
      label: "Editor Description",
      helperText: "Helper Text",
      required: true,
      placeHolder: "Enter text here.",
    },
  }),
  blockBtnElement: {
    icon: BiCommentEdit,
    label: "Editor Description",
  },
  canvasComponent: EditorDescriptionCanvasComponent,
  formComponent: EditorDescriptionFormComponent,
  propertiesComponent: EditorDescriptionPropertiesComponent,
};

import { BiCommentEdit } from "react-icons/bi";
import {
  FormBlockInstance,
  FormBlockType,
  FormCategoryType,
  ObjectBlockType,
} from "../../../interfaces/form-block";
import EditorDescriptionPropertiesComponent from "./EditorDescriptionPropertiesComponent";
import EditorDescriptionCanvasFormComponent from "./EditorDescriptionCanvasFormComponent";

const blockCategory: FormCategoryType = "Static";
const blockType: FormBlockType = "EditorDescription";

export type EditorDescriptionAttributesType = {
  content: string;
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
      content: "Editor Description",
    },
  }),
  blockBtnElement: {
    icon: BiCommentEdit,
    label: "Editor Description",
  },
  canvasComponent: EditorDescriptionCanvasFormComponent,
  formComponent: EditorDescriptionCanvasFormComponent,
  propertiesComponent: EditorDescriptionPropertiesComponent,
};

import {
  FormBlockInstance,
  FormBlockType,
  FormCategoryType,
  ObjectBlockType,
} from "../../../interfaces/form-block";
import { FaParagraph } from "react-icons/fa";

import ParagraphCanvasFormComponent from "./ParagraphCanvasFormComponent";
import ParagraphPropertiesComponent from "./ParagraphPropertiesComponent";

const blockCategory: FormCategoryType = "Field";
const blockType: FormBlockType = "Paragraph";

export type ParagraphAttributesType = {
  label: string;
  text: string;
  fontSize: "text-sm" | "text-base" | "text-lg";
  fontWeight: "font-normal" | "font-medium";
};

export type NewInstanceParagraph = FormBlockInstance & {
  attributes: ParagraphAttributesType;
};

export const ParagraphBlock: ObjectBlockType = {
  blockType,
  blockCategory,
  createInstance: (id: string) => ({
    id,
    blockType,
    attributes: {
      label: "Paragraph",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis ipsam distinctio eveniet expedita ex nemo dolorem saepe, consectetur, et nobis vero labore assumenda quidem repudiandae non id necessitatibus. Fugiat, consequuntur.",
      fontSize: "text-sm",
      fontWeight: "font-normal",
    },
  }),

  blockBtnElement: {
    icon: FaParagraph,
    label: "Paragraph",
  },
  canvasComponent: ParagraphCanvasFormComponent,
  formComponent: ParagraphCanvasFormComponent,
  propertiesComponent: ParagraphPropertiesComponent,
};

import { FaLink } from "react-icons/fa";
import {
  FormBlockInstance,
  FormBlockType,
  FormCategoryType,
  ObjectBlockType,
} from "../../../interfaces/form-block";
import LinkCanvasFormComponent from "./LinkCanvasFormComponent";
import LinkPropertiesComponent from "./LinkPropertiesComponent";

const blockCategory: FormCategoryType = "Field";
const blockType: FormBlockType = "Link";

export type LinkAttributesType = {
  label: string;
  text: string;
  href: string;
  target: "_blank" | "_self" | "_parent" | "_top";
};

export type NewInstanceLink = FormBlockInstance & {
  attributes: LinkAttributesType;
};

export const LinkBlock: ObjectBlockType = {
  blockType,
  blockCategory,
  createInstance: (id: string) => ({
    id,
    blockType,
    attributes: {
      label: "Link:",
      text: "Click here",
      href: "",
      target: "_blank",
    },
  }),
  blockBtnElement: {
    icon: FaLink,
    label: "Link",
  },
  canvasComponent: LinkCanvasFormComponent,
  formComponent: LinkCanvasFormComponent,
  propertiesComponent: LinkPropertiesComponent,
};

import {
  FormBlockInstance,
  FormBlockType,
  FormCategoryType,
  ObjectBlockType,
} from "../../../interfaces/form-block";
import { FaFileSignature } from "react-icons/fa";
import SignatureCanvasComponent from "./SignatureCanvasComponent";
import SignatureFormComponent from "./SignatureFormComponent";
import SignaturePropertiesComponent from "./SignaturePropertiesComponent";

const blockCategory: FormCategoryType = "Field";
const blockType: FormBlockType = "Signature";

export type SignatureAttributesType = {
  label: string;
  helperText: string;
  required: boolean;
};

export type NewInstanceSignature = FormBlockInstance & {
  attributes: SignatureAttributesType;
};

export const SignatureBlock: ObjectBlockType = {
  blockType,
  blockCategory,
  createInstance: (id: string) => ({
    id,
    blockType,
    attributes: {
      label: "Signature",
      helperText: "Helper Text",
      required: true,
    },
  }),
  blockBtnElement: {
    icon: FaFileSignature,
    label: "Signature",
  },
  canvasComponent: SignatureCanvasComponent,
  formComponent: SignatureFormComponent,
  propertiesComponent: SignaturePropertiesComponent,
};

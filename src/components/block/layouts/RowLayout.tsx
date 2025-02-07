import { CgRowFirst } from "react-icons/cg";
import {
  FormBlockType,
  FormCategoryType,
  ObjectBlockType,
} from "../../../interfaces/form-block";

const blockCategory: FormCategoryType = "Layout";
const blockType: FormBlockType = "RowLayout";

export const RowLayoutBlock: ObjectBlockType = {
  blockCategory,
  blockType,

  blockBtnElement: {
    icon: CgRowFirst,
    label: "Row Layout",
  },
  createInstance: (id: string) => {
    return {
      id: `row-layout-${id}`,
      blockType,
      isLocked: false,
      attributes: {},
      childBlock: [],
    };
  },
  canvasComponent: () => <div>Canvas Component</div>,
  formComponent: () => <div>Form Component</div>,
  propertiesComponent: () => <div>Properties Component</div>,
};

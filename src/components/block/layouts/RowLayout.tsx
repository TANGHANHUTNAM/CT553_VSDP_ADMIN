import { FiLayout } from "react-icons/fi";

import {
  FormBlockType,
  FormCategoryType,
  ObjectBlockType,
} from "../../../interfaces/form-block";
import RowLayoutCanvasComponent from "./RowLayoutCanvasComponent";
import RowLayoutFormComponent from "./RowLayoutFormComponent";
import RowLayoutPropertiesComponent from "./RowLayoutPropertiesComponent";

const blockCategory: FormCategoryType = "Layout";
const blockType: FormBlockType = "RowLayout";

export const RowLayoutBlock: ObjectBlockType = {
  blockCategory,
  blockType,
  blockBtnElement: {
    icon: FiLayout,
    label: "Row Layout",
  },
  createInstance: (id: string) => {
    return {
      id: `layout-${id}`,
      blockType,
      isLocked: false,
      attributes: {},
      childBlock: [],
    };
  },
  canvasComponent: RowLayoutCanvasComponent,
  formComponent: RowLayoutFormComponent,
  propertiesComponent: RowLayoutPropertiesComponent,
};

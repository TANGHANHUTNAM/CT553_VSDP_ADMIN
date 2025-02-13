import { RowLayoutBlock } from "../../components/block/layouts/RowLayout";
import { RadioSelectBlock } from "../../components/block/RadioSelectBlock";

export type FormCategoryType = "Layout" | "Field";

export type FormBlockType = "RowLayout" | "RadioSelect";

export type ObjectBlockType = {
  blockCategory: FormCategoryType;
  blockType: FormBlockType;
  blockBtnElement: {
    icon: React.ElementType;
    label: string;
  };
  createInstance: (id: string) => FormBlockInstance;
  canvasComponent: React.FC<{ blockInstance: FormBlockInstance }>;
  formComponent: React.FC;
  propertiesComponent: React.FC<{
    positionIndex?: number;
    blockInstance: FormBlockInstance;
    parentId?: string;
  }>;
};

export type FormBlockInstance = {
  id: string;
  blockType: FormBlockType;
  attributes?: Record<string, any>;
  isLocked?: boolean;
  childBlock?: FormBlockInstance[];
};

export type FormBlocksType = {
  [key in FormBlockType]: ObjectBlockType;
};

export const FormBlocks: FormBlocksType = {
  RowLayout: RowLayoutBlock,
  RadioSelect: RadioSelectBlock,
};

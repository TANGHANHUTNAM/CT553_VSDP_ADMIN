import { HeadingBlock } from "../../components/block/heading/HeadingBlock";
import { InputTextBlock } from "../../components/block/input-text/InputTextBlock";
import { RowLayoutBlock } from "../../components/block/layouts/RowLayout";
import { RadioSelectBlock } from "../../components/block/radio-select/RadioSelectBlock";
import { TextAreaBlock } from "../../components/block/text-area/TextAreaBlock";

export type FormCategoryType = "Layout" | "Field";

export type FormBlockType =
  | "RowLayout"
  | "RadioSelect"
  | "InputText"
  | "TextArea"
  | "Heading";

export type ObjectBlockType = {
  blockCategory: FormCategoryType;
  blockType: FormBlockType;
  blockBtnElement: {
    icon: React.ElementType;
    label: string;
  };
  createInstance: (id: string) => FormBlockInstance;
  canvasComponent: React.FC<{ blockInstance: FormBlockInstance }>;
  formComponent: React.FC<{ blockInstance: FormBlockInstance }>;
  propertiesComponent: React.FC<{
    positionIndex?: number;
    blockInstance: FormBlockInstance;
    parentId?: string;
  }>;
};

export type FormBlockInstance = {
  id: string;
  blockType: FormBlockType;
  attributes?: Record<string, unknown>;
  isLocked?: boolean;
  childBlock?: FormBlockInstance[];
};

export type FormBlocksType = {
  [key in FormBlockType]: ObjectBlockType;
};

export const FormBlocks: FormBlocksType = {
  RowLayout: RowLayoutBlock,
  Heading: HeadingBlock,
  InputText: InputTextBlock,
  TextArea: TextAreaBlock,
  RadioSelect: RadioSelectBlock,
};

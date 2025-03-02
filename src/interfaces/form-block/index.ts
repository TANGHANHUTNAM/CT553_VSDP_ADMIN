import { FormInstance } from "antd";
import { CheckBoxBlock } from "../../components/block/check-box/CheckBoxBlock";
import { DatePickerBlock } from "../../components/block/datepicker/DatePickerBlock";
import { EditorTextBlock } from "../../components/block/editor-text/EditorTextBlock";
import { HeadingBlock } from "../../components/block/heading/HeadingBlock";
import { InputNumberBlock } from "../../components/block/input-number/InputNumberBlock";
import { InputTextBlock } from "../../components/block/input-text/InputTextBlock";
import { RowLayoutBlock } from "../../components/block/layouts/RowLayout";
import { LinkBlock } from "../../components/block/link/LinkBlock";
import { ParagraphBlock } from "../../components/block/paragraph/ParagraphBlock";
import { RadioSelectBlock } from "../../components/block/radio-select/RadioSelectBlock";
import { RangePickerBlock } from "../../components/block/rangepicker/RangePickerBlock";
import { SelectOptionBlock } from "../../components/block/select-option/SelectOption";
import { SignatureBlock } from "../../components/block/signature/SignatureBlock";
import { TextAreaBlock } from "../../components/block/text-area/TextAreaBlock";
import { TimePickerBlock } from "../../components/block/timepicker/TimePickerBlock";
import { UploaderBlock } from "../../components/block/uploader/UploaderBlock";
import { EditorDescriptionBlock } from "../../components/block/description/EditorDescriptionBlock";

export type FormCategoryType = "Layout" | "Field";
export type FormBlockType =
  | "RowLayout"
  | "RadioSelect"
  | "InputText"
  | "TextArea"
  | "Heading"
  | "Paragraph"
  | "SelectOption"
  | "InputNumber"
  | "EditorText"
  | "DatePicker"
  | "CheckBox"
  | "TimePicker"
  | "RangePicker"
  | "Signature"
  | "Uploader"
  | "Link"
  | "EditorDescription";

export const FormNotInputBlockTypes: FormBlockType[] = [
  "RowLayout",
  "Heading",
  "Paragraph",
  "Link",
];

export type ObjectBlockType = {
  blockCategory: FormCategoryType;
  blockType: FormBlockType;
  blockBtnElement: {
    icon: React.ElementType;
    label: string;
  };
  createInstance: (id: string) => FormBlockInstance;
  canvasComponent: React.FC<{ blockInstance: FormBlockInstance }>;
  formComponent: React.FC<{
    blockInstance: FormBlockInstance;
    primary_color: string;
    block_color: string;
    form: FormInstance;
  }>;
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
  InputNumber: InputNumberBlock,
  EditorText: EditorTextBlock,
  SelectOption: SelectOptionBlock,
  RadioSelect: RadioSelectBlock,
  Paragraph: ParagraphBlock,
  DatePicker: DatePickerBlock,
  CheckBox: CheckBoxBlock,
  TimePicker: TimePickerBlock,
  RangePicker: RangePickerBlock,
  Signature: SignatureBlock,
  Uploader: UploaderBlock,
  Link: LinkBlock,
  EditorDescription: EditorDescriptionBlock,
};

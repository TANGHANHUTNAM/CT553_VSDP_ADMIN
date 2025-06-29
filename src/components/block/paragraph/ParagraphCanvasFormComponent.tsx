import { FormBlockInstance } from "../../../interfaces/form-block";
import { NewInstanceParagraph } from "./ParagraphBlock";

const ParagraphCanvasFormComponent = ({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) => {
  const block = blockInstance as NewInstanceParagraph;
  const { text, fontSize, fontWeight } = block.attributes;
  return (
    <div className="flex w-full">
      <p className={`${fontSize} ${fontWeight} text-left`}>{text}</p>
    </div>
  );
};

export default ParagraphCanvasFormComponent;

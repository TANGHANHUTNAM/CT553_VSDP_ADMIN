import { FormBlockInstance } from "../../../interfaces/form-block";
import { NewInstanceHeading } from "./HeadingBlock";

const HeadingCanvasFormComponent = ({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) => {
  const block = blockInstance as NewInstanceHeading;
  const { label, fontSize, fontWeight } = block.attributes;
  return (
    <div className="flex w-full">
      <p className={`${fontSize} ${fontWeight}`}>{label}</p>
    </div>
  );
};

export default HeadingCanvasFormComponent;

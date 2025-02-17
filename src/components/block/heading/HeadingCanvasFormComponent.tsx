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
      <h1 className={`${fontSize} ${fontWeight}`}>{label}</h1>
    </div>
  );
};

export default HeadingCanvasFormComponent;

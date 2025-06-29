import { FormBlockInstance } from "../../../interfaces/form-block";
import { NewInstanceHeading } from "./HeadingBlock";

const HeadingCanvasFormComponent = ({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) => {
  const block = blockInstance as NewInstanceHeading;
  const { label, fontSize, fontWeight, uppercase } = block.attributes;
  return (
    <div className="flex w-full">
      <p
        className={`${fontSize} ${fontWeight} ${uppercase ? "uppercase" : "lowercase"} `}
      >
        {label}
      </p>
    </div>
  );
};

export default HeadingCanvasFormComponent;

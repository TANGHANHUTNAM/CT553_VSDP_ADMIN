import { FormBlockInstance } from "../../../interfaces/form-block";
import { NewInstanceLink } from "./LinkBlock";

const LinkCanvasFormComponent = ({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) => {
  const block = blockInstance as NewInstanceLink;
  const { label, href, target, text } = block.attributes;
  return (
    <div className="flex w-full items-center gap-2">
      <div className="text-base">
        <label className={`font-medium`}>{label}</label>
      </div>
      <a
        className="cursor-default text-primary underline hover:cursor-pointer hover:text-primary hover:underline"
        href={href}
        target={target}
      >
        {text}
      </a>
    </div>
  );
};

export default LinkCanvasFormComponent;

import { FormBlockInstance, FormBlocks } from "../../interfaces/form-block";

const ChildCanvasComponentWrapper = ({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) => {
  const CanvasComponent = FormBlocks[blockInstance.blockType]?.canvasComponent;
  if (!CanvasComponent) return null;
  return <CanvasComponent blockInstance={blockInstance} />;
};

export default ChildCanvasComponentWrapper;

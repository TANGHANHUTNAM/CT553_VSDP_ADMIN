import JoditEditor from "jodit-react";
import { useContext, useEffect, useState } from "react";
import { BuilderContext } from "../../../context/form-builder/BuilderContext";
import { FormBlockInstance } from "../../../interfaces/form-block";
import { NewInstanceEditorDescription } from "./EditorDescriptionBlock";

const EditorDescriptionPropertiesComponent = ({
  positionIndex,
  parentId,
  blockInstance,
}: {
  positionIndex?: number;
  parentId?: string;
  blockInstance: FormBlockInstance;
}) => {
  const block = blockInstance as NewInstanceEditorDescription;
  const { updateChildBlock } = useContext(BuilderContext);

  const [content, setContent] = useState<string>(block.attributes.content);

  useEffect(() => {
    setContent(block.attributes.content);
  }, [block.attributes]);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    if (!parentId) return;
    console.log("Content changed:", newContent);
    updateChildBlock(parentId, block.id, {
      ...block,
      attributes: {
        ...block.attributes,
        content: newContent,
      },
    });
  };

  return (
    <div className="mb-3 w-full">
      <div className="mb-3 flex h-auto w-full justify-between gap-1">
        <span className="text-lg font-medium">
          Editor Description {positionIndex}
        </span>
      </div>
      <div>
        <label className="mb-1 block">Content</label>
        <JoditEditor
          config={{
            placeholder: "Nhập nội dung",
          }}
          tabIndex={1}
          value={content}
          onBlur={(newContent) => handleContentChange(newContent)}
        />
      </div>
    </div>
  );
};

export default EditorDescriptionPropertiesComponent;

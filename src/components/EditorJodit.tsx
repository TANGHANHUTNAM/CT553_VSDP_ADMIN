import JoditEditor from "jodit-react";
import { useRef } from "react";
import { useAppSelector } from "../hooks";
interface IEditorJoditProps {
  content: string;
  setContent: (content: string) => void;
}

const EditorJodit: React.FC<IEditorJoditProps> = ({ content, setContent }) => {
  const editor = useRef(null);
  const { isDarkMode } = useAppSelector((state) => state.app);
  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={{
        placeholder: "Nhập nội dung",
        theme: isDarkMode ? "dark" : "default",
      }}
      tabIndex={4}
      onBlur={(newContent: string) => setContent(newContent)}
    />
  );
};

export default EditorJodit;

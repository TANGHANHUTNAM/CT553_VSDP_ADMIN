import { RefObject } from "react";
import ReactQuill, { ReactQuillProps } from "react-quill";

const CustomReactQuill: React.FC<
  ReactQuillProps & { quillRef?: RefObject<ReactQuill> }
> = ({ quillRef, value, onChange, placeholder, ...rest }) => {
  const module = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "color", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
  ];

  return (
    <ReactQuill
      ref={quillRef}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      modules={module}
      formats={formats}
      {...rest}
    />
  );
};

export default CustomReactQuill;

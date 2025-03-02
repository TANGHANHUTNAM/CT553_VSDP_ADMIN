import { Form } from "antd";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FormBlockInstance } from "../../../interfaces/form-block";
import { NewInstanceEditorText } from "./EditorTextBlock";

const EditorTextCanvasComponent = ({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) => {
  const [form] = Form.useForm();
  const [value, setValue] = useState<string>("");

  const block = blockInstance as NewInstanceEditorText;
  const { helperText, label, placeHolder, required } = block.attributes;
  const handleChange = (content: string) => {
    setValue(content);
    form.setFieldsValue({ [block.id]: content });
  };
  useEffect(() => {
    form.setFieldsValue({ [block.id]: value });
  }, [value, form, block.id]);

  const validateEditor = (_: unknown, content: string) => {
    if (
      required &&
      (!content ||
        content === "<p><br></p>" ||
        content.replace(/<(.|\n)*?>/g, "").trim() === "")
    ) {
      return Promise.reject(new Error(`${label} là bắt buộc`));
    }
    return Promise.resolve();
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <Form.Item
        name={block?.id}
        label={label}
        extra={helperText}
        colon={true}
        required={required}
        rules={[
          {
            validator: validateEditor,
          },
        ]}
        className="!pointer-events-none"
      >
        <ReactQuill
          key={placeHolder}
          readOnly
          theme="snow"
          value={value}
          onChange={handleChange}
          placeholder={placeHolder}
          className="!pointer-events-none w-2/3 cursor-default"
        />
      </Form.Item>

      <div className="prose mt-4" dangerouslySetInnerHTML={{ __html: value }} />
    </div>
  );
};

export default EditorTextCanvasComponent;

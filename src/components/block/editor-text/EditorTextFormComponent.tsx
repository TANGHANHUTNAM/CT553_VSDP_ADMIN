import { Form } from "antd";
import { useRef, useState } from "react";
import ReactQuill from "react-quill";
import { FormBlockInstance } from "../../../interfaces/form-block";
import { NewInstanceEditorText } from "./EditorTextBlock";
import "react-quill/dist/quill.snow.css";
const EditorTextFormComponent = ({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) => {
  const [form] = Form.useForm();
  const [value, setValue] = useState<string>("");
  const quillRef = useRef<ReactQuill | null>(null);
  const block = blockInstance as NewInstanceEditorText;
  const { helperText, label, placeHolder, required } = block.attributes;
  const handleChange = (content: string) => {
    setValue(content);
    form.setFieldsValue({ [block.id]: content });
  };

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
      <div className="mb-3 text-base">
        <label className={`font-medium`}>
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
        {helperText && <p className="mt-1 text-[0.9rem]">{helperText}</p>}
      </div>
      <Form form={form} validateTrigger={["onChange", "onBlur"]}>
        <Form.Item
          name={block?.id}
          required={required}
          rules={[
            {
              validator: validateEditor,
            },
          ]}
        >
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={value}
            onChange={handleChange}
            placeholder={placeHolder}
            className="w-2/3"
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditorTextFormComponent;

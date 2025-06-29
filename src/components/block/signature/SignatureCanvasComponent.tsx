import { Button, Form } from "antd";
import { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { FormBlockInstance } from "../../../interfaces/form-block";
import { NewInstanceSignature } from "./SignatureBlock";

const SignatureCanvasComponent = ({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) => {
  const [form] = Form.useForm();
  const signatureRef = useRef<SignatureCanvas>(null);
  const block = blockInstance as NewInstanceSignature;
  const { helperText, label, required } = block.attributes;
  const [value, setValue] = useState<string | undefined>("");

  const handleChange = (content: string | undefined) => {
    setValue(content);
    form.setFieldsValue({ [block.id]: content });
  };
  useEffect(() => {
    form.setFieldsValue({ [block.id]: value });
  }, [value, form, block.id]);

  const validateEditor = async (_: unknown, content: string) => {
    if (required && !content) {
      return Promise.reject(new Error(`${label} là bắt buộc`));
    }
    return Promise.resolve();
  };
  return (
    <div className="flex w-full flex-col gap-2">
      <Form.Item
        label={label}
        colon={true}
        extra={helperText}
        htmlFor={block?.id}
        name={block?.id}
        required={required}
        rules={[
          {
            validator: validateEditor,
          },
        ]}
        className="!pointer-events-none cursor-default"
      >
        <SignatureCanvas
          ref={signatureRef}
          penColor="black"
          canvasProps={{
            className: "w-2/3 border border-gray-300 cursor-default",
            style: { touchAction: "none" },
          }}
          clearOnResize={false}
          onEnd={() => {
            handleChange(signatureRef.current?.toDataURL());
            form.validateFields([block.id]);
          }}
        />
      </Form.Item>
      <div className="!pointer-events-none flex w-2/3 justify-end">
        <Button className="mr-2" size="small" type="default">
          Xóa
        </Button>
        <Button className="mr-2" size="small" type="primary">
          Lưu
        </Button>
      </div>
    </div>
  );
};

export default SignatureCanvasComponent;

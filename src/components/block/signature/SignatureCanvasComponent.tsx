import { useEffect, useRef, useState } from "react";
import { FormBlockInstance } from "../../../interfaces/form-block";
import { NewInstanceSignature } from "./SignatureBlock";
import SignatureCanvas from "react-signature-canvas";
import { Button, Form } from "antd";
import { GrPowerReset } from "react-icons/gr";

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
      <div className="mb-3 text-base">
        <label className={`font-medium ${required ? "text-red-500" : ""}`}>
          {label}
          {required && <span className="ml-1">*</span>}
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
        <Form.Item className="flex w-2/3 justify-end">
          <Button
            onClick={() => {
              setValue("");
              form.setFieldsValue({ [block.id]: "" });
              signatureRef.current?.clear();
              form.validateFields([block.id]);
            }}
            type="primary"
            icon={<GrPowerReset />}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignatureCanvasComponent;

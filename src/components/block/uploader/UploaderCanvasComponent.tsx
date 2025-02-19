import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Upload, UploadProps } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FormBlockInstance } from "../../../interfaces/form-block";
import { NewInstanceUploader } from "./UploaderBlock";

const UploaderCanvasComponent = ({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) => {
  const block = blockInstance as NewInstanceUploader;
  const { helperText, label, numberMax, required, sizeMax, textButton, type } =
    block.attributes;
  const [fileList, setFileList] = useState<any[]>([]);
  const [form] = Form.useForm();

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error("Invalid file"));
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("File converted to base64:", reader.result);
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        console.error("Error converting file to base64:", error);
        reject(error);
      };
    });
  };

  const isFileTypeValid = (file: File) => {
    if (type.length === 0) return true;

    const fileExtension = `.${file.name.split(".").pop()}`.toLowerCase();
    const isExtensionValid = type.some(
      (t) => t.toLowerCase() === fileExtension,
    );

    const isMimeTypeValid = type.some((t) => {
      if (t.endsWith("/*")) {
        const typePrefix = t.split("/")[0];
        return file.type.startsWith(`${typePrefix}/`);
      } else {
        return file.type === t;
      }
    });

    return isExtensionValid || isMimeTypeValid;
  };
  const propsUpload: UploadProps = {
    name: "file",
    headers: {
      authorization: "authorization-text",
    },
    accept: type.length > 0 ? type.join(",") : "*",
    fileList,
    beforeUpload: (file) => {
      if (fileList.length >= numberMax) {
        toast.error(`Maximum number of files (${numberMax}) reached!`);
        return false;
      }

      if (!isFileTypeValid(file)) {
        toast.error(`You can only upload files of type: ${type.join(", ")}!`);
        return false;
      }

      const isLtSizeMax = file.size / 1024 / 1024 <= sizeMax;
      if (!isLtSizeMax) {
        toast.error(`File size must be smaller than ${sizeMax}MB!`);
        return false;
      }

      return true;
    },
    async onChange(info) {
      const validFiles = info.fileList.filter((file) => {
        const isTypeValid = isFileTypeValid(file as unknown as File);
        const isLtSizeMax = file.size
          ? file.size / 1024 / 1024 <= sizeMax
          : true;
        return isTypeValid && isLtSizeMax;
      });

      setFileList(validFiles);

      const base64Files = await Promise.all(
        validFiles.map(async (file) => {
          if (file.originFileObj) {
            try {
              const base64 = await convertFileToBase64(file.originFileObj);
              console.log("File converted:", file.name, base64);
              return { name: file.name, base64 };
            } catch (error) {
              console.error("Base64 conversion error:", error);
              return null;
            }
          }
          return null;
        }),
      );

      const filteredBase64Files = base64Files.filter(Boolean);
      console.log("Filtered base64 files:", filteredBase64Files);
      form.setFieldsValue({
        [block.id]:
          filteredBase64Files.length > 0 ? filteredBase64Files : undefined,
      });

      form.validateFields([block.id]);

      if (info.file.status === "done") {
        toast.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        toast.error(`${info.file.name} file upload failed.`);
      }
    },
    maxCount: numberMax,
    customRequest: ({ onSuccess }) => {
      setTimeout(() => {
        onSuccess?.("ok");
      }, 1000);
    },
  };

  useEffect(() => {
    console.log("form.getFieldValue(block.id)", form.getFieldValue(block.id));
  }, [fileList, form, block.id]);

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
          name={block.id}
          required={required}
          rules={[
            {
              validator: async (_, value) => {
                if (required && (!value || value.length === 0)) {
                  return Promise.reject(new Error(`${label} is required`));
                }
                return Promise.resolve();
              },
            },
          ]}
          validateTrigger={["onChange", "onBlur"]}
        >
          <Upload {...propsUpload}>
            <Button icon={<UploadOutlined />}>{textButton}</Button>
          </Upload>
        </Form.Item>
      </Form>
      <div className="flex flex-col gap-1 text-xs text-gray-700">
        <span>Kích thước mỗi tệp tối đa: {sizeMax} MB</span>
        <span>Số lượng file tối đa: {numberMax}</span>
      </div>
    </div>
  );
};

export default UploaderCanvasComponent;

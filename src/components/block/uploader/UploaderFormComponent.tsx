import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Upload, UploadFile, UploadProps } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { FormBlockInstance } from "../../../interfaces/form-block";
import { NewInstanceUploader } from "./UploaderBlock";
const UploaderFormComponent = ({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) => {
  const block = blockInstance as NewInstanceUploader;
  const {
    helperText,
    label,
    numberMax,
    required,
    sizeMax,
    textButton,
    type,
    size,
  } = block.attributes;
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error("Tệp không hợp lệ!"));
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
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
        toast.error(`Đã đạt số lượng tệp tối đa: ${numberMax}!`);
        return false;
      }

      if (!isFileTypeValid(file)) {
        toast.error(`Chỉ có thể tệp có định dạng: ${type.join(", ")}!`);
        return false;
      }

      const isLtSizeMax = file.size / 1024 / 1024 <= sizeMax;
      if (!isLtSizeMax) {
        toast.error(`Kích thước tệp phải nhỏ hơn ${sizeMax}MB!`);
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

      form.setFieldsValue({
        [block.id]:
          filteredBase64Files.length > 0 ? filteredBase64Files : undefined,
      });
      form.validateFields([block.id]);

      if (info.file.status === "done") {
        toast.success(`${info.file.name} tệp được tải lên thành công`);
      } else if (info.file.status === "error") {
        toast.error(`${info.file.name} tệp tải lên thất bại`);
      }
    },
    maxCount: numberMax,
    customRequest: ({ onSuccess }) => {
      setTimeout(() => {
        onSuccess?.("ok");
      }, 1000);
    },
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
          name={block.id}
          required={required}
          rules={[
            {
              validator: async (_, value) => {
                if (required && (!value || value.length === 0)) {
                  return Promise.reject(new Error(`${label} là bắt buộc`));
                }
                return Promise.resolve();
              },
            },
          ]}
          validateTrigger={["onChange", "onBlur"]}
        >
          <Upload {...propsUpload}>
            <Button size={size} icon={<UploadOutlined />}>
              {textButton}
            </Button>
          </Upload>
        </Form.Item>
      </Form>
      <div className="flex flex-col gap-1 text-xs text-gray-700">
        <span>Kích thước mỗi tệp tối đa: {sizeMax} MB</span>
        <span>Số lượng file tối đa: {numberMax}</span>
      </div>
      {/* <List
        dataSource={fileList}
        renderItem={(file) => (
          <List.Item>
            {isImage(file) ? (
              <Image
                width={100}
                src={URL.createObjectURL(file.originFileObj as File)}
                alt={file.name}
                preview={{
                  mask: <EyeOutlined />,
                }}
              />
            ) : (
              <div>
                <span>{file.name}</span>
                <Button
                  type="link"
                  icon={<DownloadOutlined />}
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(file.originFileObj as File);
                    link.download = file.name;
                    link.click();
                  }}
                >
                  Tải xuống
                </Button>
              </div>
            )}
          </List.Item>
        )}
      /> */}
    </div>
  );
};

export default UploaderFormComponent;

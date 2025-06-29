import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  FormInstance,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FormBlockInstance } from "../../../interfaces/form-block";
import {
  deleteFileService,
  uploadFileService,
} from "../../../services/upload/upload-service";
import { NewInstanceUploader } from "./UploaderBlock";
import { IResponse } from "../../../interfaces";
const UploaderFormComponent = ({
  blockInstance,
  form,
}: {
  blockInstance: FormBlockInstance;
  form: FormInstance;
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
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  useEffect(() => {
    const formFiles = form.getFieldValue(block.id) || [];
    if (formFiles.length > 0 && fileList.length === 0) {
      const restoredFileList = formFiles.map(
        (file: { public_id: string; url: string }) => ({
          uid: file.public_id,
          name: file.url.split("/").pop() || file.public_id, // Lấy tên file từ URL
          status: "done",
          url: file.url,
          response: { public_id: file.public_id, secure_url: file.url },
        }),
      );
      setFileList(restoredFileList);
    }
  }, [form, block.id, fileList.length]);
  const determineResourceType = (
    file: File,
    allowedTypes: string[],
  ): string => {
    const fileMimeType = file.type;
    console.log("type", allowedTypes);
    console.log("fileMimeType", fileMimeType);
    const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;

    if (
      allowedTypes.some(
        (t) => t === "image/*" && fileMimeType.startsWith("image/"),
      )
    ) {
      return "image";
    } else if (
      allowedTypes.some(
        (t) => t === "video/*" && fileMimeType.startsWith("video/"),
      )
    ) {
      return "video";
    } else if (
      allowedTypes.some(
        (t) => t === "audio/*" && fileMimeType.startsWith("audio/"),
      )
    ) {
      return "video";
    } else if (
      allowedTypes.some(
        (t) => t === "application/pdf" && fileMimeType === "application/pdf",
      )
    ) {
      return "raw";
    } else if (
      allowedTypes.some(
        (t) => [".doc", ".xls", ".ppt"].includes(t) && t === fileExtension,
      )
    ) {
      return "raw";
    }

    return "auto";
  };

  const uploadToCloudinary = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      const resourceType = determineResourceType(file, type);
      const response = await uploadFileService(resourceType, formData);
      if (!response.data || !response.data.secure_url) {
        throw new Error("Không nhận được URL từ Cloudinary");
      }
      return response.data;
    } catch (error) {
      console.error("Error uploading file to Cloudinary:", error);
      throw error;
    }
  };

  const deleteFromCloudinary = async (public_id: string) => {
    try {
      const res: IResponse<string> = await deleteFileService(public_id);
      console.log(res);
      if (res && res.data) {
        toast.success(res.message as string);
      }
      if (res && res.error) {
        toast.error(res.message as string);
      }
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra khi xóa tệp");
    }
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

  const isFileSizeValid = (file: File) => {
    return file.size / 1024 / 1024 <= sizeMax;
  };
  const propsUpload: UploadProps = {
    name: "file",
    headers: {
      authorization: "authorization-text",
    },
    accept: type.length > 0 ? type.join(",") : "*",
    fileList,
    multiple: true,
    beforeUpload: (file, fileListBatch) => {
      const currentFileCount = fileList.length;
      const newFileCount = fileListBatch.length;
      const remainingSlots = numberMax - currentFileCount;

      if (currentFileCount >= numberMax) {
        toast.error(`Đã đạt số lượng tệp tối đa: ${numberMax}!`);
        return false;
      }

      if (newFileCount > remainingSlots) {
        toast.error(`Chỉ có thể thêm tối đa ${remainingSlots} tệp nữa!`);
        return false;
      }

      if (!isFileTypeValid(file)) {
        toast.error(`Chỉ có thể tệp có định dạng: ${type.join(", ")}!`);
        return false;
      }

      if (!isFileSizeValid(file)) {
        toast.error(`Kích thước tệp phải nhỏ hơn ${sizeMax}MB!`);
        return false;
      }

      return true;
    },
    onChange: (info) => {
      const updatedFileList = info.fileList
        .filter((file) => {
          // Loại file không hợp lệ (định dạng, kích thước) hoặc lỗi
          if (
            file.status === "error" ||
            !isFileTypeValid(file.originFileObj as File) ||
            !isFileSizeValid(file.originFileObj as File)
          ) {
            return false;
          }
          return true;
        })
        .slice(0, numberMax) // Giới hạn tối đa numberMax file
        .map((file) => {
          if (file.status === "done" && file.response) {
            return {
              ...file,
              url: file.response.url,
              uid: file.response.public_id, // Lưu public_id vào uid
            };
          }
          return file;
        });

      // Nếu file mới lỗi và đã có file cũ, giữ nguyên fileList cũ
      if (info.file.status === "error" && fileList.length > 0) {
        return; // Không cập nhật fileList, giữ nguyên file cũ
      }

      setFileList(updatedFileList);

      // Cập nhật form với danh sách file có public_id và url
      const uploadedFiles = updatedFileList
        .filter((file) => file.url && file.uid) // Chỉ lấy file đã upload thành công
        .map((file) => ({
          public_id: file.uid as string, // public_id từ uid
          url: file.url as string,
        }));
      form.setFieldsValue({
        [block.id]: uploadedFiles.length > 0 ? uploadedFiles : undefined,
      });

      if (info.file.status === "done") {
        toast.success(`${info.file.name} tệp được tải lên thành công`);
      } else if (info.file.status === "error") {
        toast.error(`${info.file.name} tệp tải lên thất bại`);
      }
    },
    maxCount: numberMax,
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        const result = await uploadToCloudinary(file as File);
        if (result) {
          onSuccess?.({ url: result.secure_url, public_id: result.public_id });
        } else {
          throw new Error("Tải tệp lên thất bại");
        }
      } catch (error) {
        onError?.(error as Error);
        toast.error("Tải lên tệp thất bại");
      }
    },
    onRemove: async (file) => {
      if (file.uid) {
        await deleteFromCloudinary(file.uid);
      }
      return true;
    },
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <Form.Item
        label={label}
        colon={true}
        extra={helperText}
        htmlFor={block.id}
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
      >
        <Upload {...propsUpload}>
          <Button
            size={size}
            disabled={fileList.length >= numberMax}
            icon={<UploadOutlined />}
          >
            {textButton}
          </Button>
        </Upload>
      </Form.Item>

      <div className="flex flex-col gap-1 text-xs text-gray-700">
        <span>Kích thước mỗi tệp tối đa: {sizeMax} MB</span>
        <span>Số lượng file tối đa: {numberMax}</span>
      </div>
    </div>
  );
};

export default UploaderFormComponent;

import {
  Button,
  Form,
  FormInstance,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { deleteFileService, uploadFileService } from "../../services";
interface IUploaderEditResponseProps {
  field: {
    id: string;
    label: string;
  };
  form: FormInstance;
}

const UploaderEditResponse: React.FC<IUploaderEditResponseProps> = ({
  field,
  form,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  useEffect(() => {
    const formFiles = form.getFieldValue(field.id) || [];
    if (formFiles.length > 0) {
      const restoredFileList = formFiles.map(
        (file: { public_id: string; url: string }) => ({
          uid: file.public_id,
          name: file.url.split("/").pop() || file.public_id,
          status: "done",
          url: file.url,
          response: { public_id: file.public_id, secure_url: file.url },
        }),
      );
      setFileList(restoredFileList);
    }
  }, [form, field.id]);

  const uploadToCloudinary = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      const response = await uploadFileService("auto", formData);
      if (!response.data || !response.data.secure_url) {
        throw new Error("Không nhận được URL từ Cloudinary");
      }
      return response.data;
    } catch (error) {
      console.error("Error uploading file to Cloudinary:", error);
      throw error;
    }
  };

  const deleteFromCloudinary = async (publicId: string) => {
    try {
      await deleteFileService(publicId);
      toast.success("Xóa tệp thành công");
    } catch (error) {
      console.error("Error deleting from Cloudinary:", error);
      toast.error("Có lỗi xảy ra khi xóa tệp");
    }
  };

  const uploadProps: UploadProps = {
    fileList,
    multiple: true,
    beforeUpload: () => {
      return true;
    },
    onChange: (info) => {
      let updatedFileList = [...info.fileList];

      // Cập nhật trạng thái fileList
      updatedFileList = updatedFileList.map((file) => {
        if (file.status === "done" && file.response) {
          return {
            ...file,
            url: file.response.secure_url,
            uid: file.response.public_id,
          };
        }
        return file;
      });

      setFileList(updatedFileList);

      const uploadedFiles = updatedFileList
        .filter((file) => file.url && file.uid)
        .map((file) => ({
          public_id: file.uid as string,
          url: file.url as string,
        }));
      form.setFieldsValue({
        [field.id]: uploadedFiles.length > 0 ? uploadedFiles : undefined,
      });

      if (info.file.status === "done") {
        toast.success(`${info.file.name} tải lên thành công`);
      } else if (info.file.status === "error") {
        toast.error(`${info.file.name} tải lên thất bại`);
      }
    },
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        const result = await uploadToCloudinary(file as File);
        onSuccess?.({
          secure_url: result.secure_url,
          public_id: result.public_id,
        });
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
      <Form.Item name={field.id}>
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Tải lên</Button>
        </Upload>
      </Form.Item>
    </div>
  );
};

export default UploaderEditResponse;

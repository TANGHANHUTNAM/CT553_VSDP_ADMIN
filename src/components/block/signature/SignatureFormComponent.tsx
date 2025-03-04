import { Button, Form, FormInstance } from "antd";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import SignatureCanvas from "react-signature-canvas";
import { IResponse } from "../../../interfaces";
import { FormBlockInstance } from "../../../interfaces/form-block";
import {
  deleteFileService,
  uploadFileService,
} from "../../../services/upload/upload-service";
import { NewInstanceSignature } from "./SignatureBlock";

const SignatureFormComponent = ({
  blockInstance,
  form,
}: {
  blockInstance: FormBlockInstance;
  form: FormInstance;
}) => {
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const signatureRef = useRef<SignatureCanvas>(null);
  const block = blockInstance as NewInstanceSignature;
  const { helperText, label, required } = block.attributes;
  const [value, setValue] = useState<
    | {
        public_id?: string;
        url?: string;
      }
    | undefined
  >(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  // Khôi phục giá trị từ form khi component mount hoặc block.id thay đổi
  useEffect(() => {
    const initialValue = form.getFieldValue(block.id);
    if (initialValue && initialValue.url) {
      setValue(initialValue); // Đồng bộ giá trị từ form vào state
    }
  }, [form, block.id]);

  // Cập nhật canvas khi value.url thay đổi
  useEffect(() => {
    if (value?.url && signatureRef.current) {
      signatureRef.current.clear();
      signatureRef.current.fromDataURL(value.url);
    } else if (!value?.url && signatureRef.current) {
      signatureRef.current.clear(); // Xóa canvas nếu không có giá trị
    }
  }, [value?.url]);

  // Tải chữ ký lên Cloudinary
  const uploadToCloudinary = async (dataUrl: string) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", dataUrl);
      formData.append("upload_preset", UPLOAD_PRESET);

      const response = await uploadFileService("auto", formData);
      if (!response.data || !response.data.secure_url) {
        throw new Error("Không nhận được URL từ Cloudinary");
      }
      toast.success("Tải lên thành công!");
      return {
        public_id: response.data.public_id,
        url: response.data.secure_url,
      };
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      toast.error("Có lỗi xảy ra khi tải lên");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Xóa chữ ký khỏi Cloudinary
  const deleteFromCloudinary = async (publicId: string) => {
    try {
      const res: IResponse<string> = await deleteFileService(publicId);
      if (res && res.data) {
        toast.success(res.message as string);
      }
      if (res && res.error) {
        toast.error(res.message as string);
      }
    } catch (error) {
      console.error("Error deleting from Cloudinary:", error);
      toast.error("Có lỗi xảy ra khi xóa ảnh");
      throw error;
    }
  };

  // Xử lý lưu chữ ký
  const handleSave = async () => {
    if (signatureRef.current?.isEmpty()) {
      setValue(undefined);
      form.setFieldsValue({ [block.id]: undefined });
      try {
        await form.validateFields([block.id]);
      } catch (error) {
        console.error("Failed to validate signature:", error);
      }
      return;
    }

    const signatureData = signatureRef.current?.toDataURL();
    try {
      const { public_id, url } = await uploadToCloudinary(signatureData!);
      setValue({ public_id, url });
      form.setFieldsValue({ [block.id]: { public_id, url } });
      await form.validateFields([block.id]);
    } catch (error) {
      console.error("Failed to save signature:", error);
    }
  };

  // Xử lý xóa chữ ký
  const handleClear = async () => {
    if (value?.public_id) {
      try {
        await deleteFromCloudinary(value.public_id);
      } catch (error) {
        console.error("Failed to delete signature:", error);
      }
    }
    setValue(undefined);
    form.setFieldsValue({ [block.id]: undefined });
    signatureRef.current?.clear();
    try {
      await form.validateFields([block.id]);
    } catch (error) {
      console.error("Failed to clear signature:", error);
    }
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
            validator: async (
              _: unknown,
              content: { public_id?: string; url?: string } | undefined,
            ) => {
              if (required && (!content || !content.url)) {
                return Promise.reject(new Error(`${label} là bắt buộc`));
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <SignatureCanvas
          ref={signatureRef}
          penColor="black"
          canvasProps={{
            className: "w-2/3 border border-gray-300 cursor-default",
          }}
          clearOnResize={false}
        />
      </Form.Item>
      <div className="flex w-2/3 justify-end">
        <Button
          className="mr-2"
          size="small"
          onClick={handleClear}
          type="default"
        >
          Xóa
        </Button>
        <Button
          loading={loading}
          className="mr-2"
          size="small"
          onClick={handleSave}
          type="primary"
        >
          Lưu
        </Button>
      </div>
    </div>
  );
};

export default SignatureFormComponent;

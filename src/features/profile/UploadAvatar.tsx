import type { GetProp, UploadFile, UploadProps } from "antd";
import { Button, Image, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiSaveUp2 } from "react-icons/ci";
import { IUsersResponse } from "../../interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAvatarProfileService } from "../../services";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setUser } from "../../redux/userReducer";
interface IUploadAvatarProps {
  dataUserProfile: IUsersResponse | null;
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const UploadAvatar: React.FC<IUploadAvatarProps> = ({ dataUserProfile }) => {
  const queryClient = useQueryClient();
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  useEffect(() => {
    if (dataUserProfile && dataUserProfile.avatar_url) {
      setFileList([
        {
          uid: "-1",
          name: dataUserProfile.public_id || "image.png",
          status: "done",
          url: dataUserProfile.avatar_url || "",
        },
      ]);
    }
  }, [dataUserProfile]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    if (newFileList.length > 1) {
      toast.error("Chỉ có thể tải lên một ảnh duy nhất");
      return;
    }
    setFileList(newFileList);
  };

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const mutationUploadAvatar = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await updateAvatarProfileService(data);
      return res;
    },
    onSuccess: (data) => {
      if (data && data.data) {
        queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
        dispatch(
          setUser({
            ...user,
            avatar_url: data.data.avatar_url,
            public_id: data.data.public_id,
          }),
        );
        toast.success(data.message as string);
      }
      if (data && data.error) {
        toast.error(data.message as string);
      }
    },
    onError: () => {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    },
  });

  const handleUpload = async () => {
    if (!fileList[0]) {
      toast.error("Vui lòng chọn ảnh");
      return;
    }
    const formData = new FormData();
    formData.append("image", fileList[0].originFileObj as FileType);
    formData.append("public_id", dataUserProfile?.public_id || "");
    mutationUploadAvatar.mutate(formData);
  };

  return (
    <div className="relative">
      <ImgCrop rotationSlider>
        <Upload
          className=""
          action={""}
          onRemove={() => setFileList([])}
          listType="picture-circle"
          fileList={fileList}
          onChange={onChange}
          onPreview={handlePreview}
          defaultFileList={fileList}
          beforeUpload={(file) => {
            const isImage = file.type.startsWith("image/");
            if (!isImage) {
              toast.error("Chỉ có thể tải lên tệp ảnh");
              return Upload.LIST_IGNORE;
            }
            if (fileList.length >= 1) {
              toast.error("Chỉ có thể tải lên một ảnh duy nhất");
              return Upload.LIST_IGNORE;
            }
            return false;
          }}
          style={{ position: "relative" }}
        >
          {fileList.length < 1 && "+ Tải ảnh"}
        </Upload>
      </ImgCrop>
      {fileList.length > 0 && fileList[0].originFileObj && (
        <Button
          onClick={() => handleUpload()}
          className="absolute -bottom-8 left-1.5"
          type="primary"
          size="small"
          icon={<CiSaveUp2 />}
          loading={mutationUploadAvatar.isPending}
        >
          Cập nhật
        </Button>
      )}

      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};

export default UploadAvatar;

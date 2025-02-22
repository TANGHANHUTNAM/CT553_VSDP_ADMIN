import { UploadOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import type { UploadProps } from "antd";
import { Button, Descriptions, Input, Popconfirm, Tag, Upload } from "antd";
import React, { useContext, useState } from "react";
import { HexColorPicker } from "react-colorful";
import toast from "react-hot-toast";
import { FaWpforms } from "react-icons/fa";
import {
  GLOBAL_COLOR,
  GLOBAL_COLOR_BACKGROUND,
  GLOBAL_COLOR_BLOCK,
} from "../../constants/colorCustom";
import { BuilderContext } from "../../context/form-builder/BuilderContext";
import { updateStyleFormService } from "../../services";
import { formatDate, formatDateTime } from "../../utils/functionUtils";
import ModalUpdateDescriptionForm from "./ModalUpdateDescriptionForm";
const FormSettings: React.FC = () => {
  const {
    formData,
    primaryColor,
    setPrimaryColor,
    setBlockColor,
    setBackgroundColor,
    blockColor,
    backgroundColor,
    setImageUrl,
  } = useContext(BuilderContext);
  const mutationUploadImageForm = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await updateStyleFormService(formData?.id as string, data);
      return res;
    },
    onSuccess: (data) => {
      if (data && data.data) {
        toast.success(data.message as string);
        if (data?.data?.image_url) {
          setImageUrl(data.data.image_url);
          setBackgroundColor(
            data.data.background_color || GLOBAL_COLOR_BACKGROUND,
          );
          setBlockColor(data.data.block_color || GLOBAL_COLOR_BLOCK);
          setPrimaryColor(data.data.primary_color || GLOBAL_COLOR);
        }
      }
      if (data && data.error) {
        toast.error(data.message as string);
      }
    },
    onError: () => {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    },
  });
  const [fileImage, setFileImage] = useState<File[]>([]);

  const props: UploadProps = {
    name: "file",
    accept: ".jpg,.jpeg,.png,.gif,.bmp",
    headers: {
      authorization: "authorization-text",
    },
    maxCount: 1,
    multiple: false,
    showUploadList: true,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        toast.error("Chỉ có thể tải lên tệp ảnh");
        return Upload.LIST_IGNORE;
      }
      return true;
    },
    onChange: (info) => {
      if (info.file.status === "done") {
        setFileImage([info.file.originFileObj as File]);
        toast.success(`${info.file.name} Tệp được tải lên thành công`);
      } else if (info.file.status === "error") {
        toast.error(`${info.file.name} Tệp tải lên thất bại`);
      }
    },
    customRequest: async ({ onSuccess }) => {
      setTimeout(() => {
        onSuccess?.("ok");
      }, 1000);
    },
  };
  return (
    <div className="h-[calc(100vh-155px)] w-full overflow-y-auto p-2 text-gray-600 scrollbar-thin">
      <Descriptions
        bordered
        styles={{
          label: {
            padding: "10px",
            width: "120px",
            textAlign: "left",
          },
          content: {
            padding: "10px",
          },
        }}
        column={1}
        className="mt-2"
        size="default"
        title={
          <div className="flex items-center justify-between text-primary">
            <div className="flex items-center gap-1">
              <FaWpforms className="text-lg" />
              <div className="text-lg font-medium">Thông tin biểu mẫu</div>
            </div>
            <Button
              loading={mutationUploadImageForm.isPending}
              onClick={() => {
                const data = new FormData();
                data.append("image", fileImage[0]);
                data.append("public_id", formData?.public_id || "");
                data.append("primary_color", primaryColor);
                data.append("block_color", blockColor);
                data.append("background_color", backgroundColor);
                mutationUploadImageForm.mutate(data);
              }}
              type="primary"
              size="small"
            >
              Lưu
            </Button>
          </div>
        }
        items={[
          {
            key: "1",
            label: "Tên biểu mẫu",
            children: <p>{formData?.name || "--"}</p>,
          },
          {
            key: "2",
            label: "Miêu tả",
            children: (
              <ModalUpdateDescriptionForm
                value={formData?.description || ""}
                titleButton="Xem chi tiêt"
              />
            ),
          },
          {
            key: "4",
            label: "Người tạo biểu mẫu",
            children: <p>{formData?.creator_name || "---"}</p>,
          },
          {
            key: "13",
            label: "Tải lên ảnh",
            children: (
              <div className="flex w-full items-center">
                <Upload {...props}>
                  <Button
                    disabled={formData?.is_public}
                    size="small"
                    icon={<UploadOutlined />}
                  >
                    Tải ảnh lên
                  </Button>
                </Upload>
              </div>
            ),
          },
          {
            key: "10",
            label: "Màu chủ đạo",
            children: (
              <Popconfirm
                disabled={formData?.is_public}
                title=""
                icon={null}
                description={
                  <HexColorPicker
                    color={primaryColor}
                    onChange={setPrimaryColor}
                  />
                }
                trigger={"hover"}
                className=""
                showCancel={false}
                okButtonProps={{ className: "hidden" }}
              >
                <Input
                  disabled={formData?.is_public}
                  type="text"
                  value={primaryColor}
                  allowClear
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  onClear={() => setPrimaryColor(GLOBAL_COLOR)}
                />
              </Popconfirm>
            ),
          },
          {
            key: "11",
            label: "Màu khối",
            children: (
              <Popconfirm
                disabled={formData?.is_public}
                title=""
                icon={null}
                description={
                  <HexColorPicker color={blockColor} onChange={setBlockColor} />
                }
                trigger={"hover"}
                className=""
                showCancel={false}
                okButtonProps={{ className: "hidden" }}
              >
                <Input
                  type="text"
                  disabled={formData?.is_public}
                  value={blockColor}
                  onChange={(e) => setBlockColor(e.target.value)}
                  allowClear
                  onClear={() => setBlockColor(GLOBAL_COLOR_BLOCK)}
                />
              </Popconfirm>
            ),
          },
          {
            key: "12",
            label: "Màu nền",
            children: (
              <Popconfirm
                disabled={formData?.is_public}
                title=""
                icon={null}
                description={
                  <HexColorPicker
                    color={backgroundColor}
                    onChange={setBackgroundColor}
                  />
                }
                trigger={"hover"}
                className=""
                showCancel={false}
                okButtonProps={{ className: "hidden" }}
              >
                <Input
                  disabled={formData?.is_public}
                  type="text"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  allowClear
                  onClear={() => setBackgroundColor(GLOBAL_COLOR_BACKGROUND)}
                />
              </Popconfirm>
            ),
          },

          {
            key: "9",
            label: "Công khai",
            children: (
              <div>
                <Tag color={formData?.is_public ? "green" : "red"}>
                  {formData?.is_public ? "Đã công khai" : "Không công khai"}
                </Tag>
              </div>
            ),
          },
          ...((formData?.scope === "SCHOLARSHIP" && [
            {
              key: "10",
              label: "Hiển thị giao diện nộp học bổng",
              children: (
                <div>
                  <Tag color={formData?.is_default ? "green" : "red"}>
                    {formData?.is_default ? "Đang hiển thị" : "Không hiển thị"}
                  </Tag>
                </div>
              ),
            },
          ]) ||
            []),
          {
            key: "5",
            label: "Thời gian hoạt động",
            children: (
              <p>
                {formatDate(formData?.start_date || "")} - {``}
                {formatDate(formData?.end_date || "")}
              </p>
            ),
          },
          {
            key: "6",
            label: "Thời gian tạo",
            children: <p>{formatDateTime(formData?.created_at || "")}</p>,
          },
          {
            key: "7",
            label: "Thời gian cập nhật",
            children: <p>{formatDateTime(formData?.updated_at || "")}</p>,
          },
        ]}
      />
    </div>
  );
};

export default FormSettings;

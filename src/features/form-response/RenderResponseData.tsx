import { useState } from "react";
import { FormBlockType } from "../../interfaces/form-block";
import { formatDate, formatTime } from "../../utils/functionUtils";
import { Button, Image, List, Modal, Typography } from "antd";
import parse from "html-react-parser";
import { BiDownload } from "react-icons/bi";

const { Text } = Typography;

const ModalUploader = ({
  value,
}: {
  value: {
    url: string;
    public_id: string;
  }[];
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const getFileType = (url: string) => {
    const extension = url.split(".").pop()?.toLowerCase();
    if (["jpg", "jpeg", "png", "gif"].includes(extension || "")) return "image";
    if (["mp4", "webm", "ogg"].includes(extension || "")) return "video";
    if (["pdf"].includes(extension || "")) return "pdf";
    if (["doc", "docx"].includes(extension || "")) return "doc";
    if (["xls", "xlsx"].includes(extension || "")) return "excel";
    return "unknown";
  };

  const getFileName = (public_id: string, url: string) => {
    return public_id.split("/").pop() || url.split("/").pop() || "Unnamed File";
  };

  return (
    <>
      <Button
        type="link"
        onClick={() => setOpen(true)}
        title={`Xem ${value.length} tệp`}
      >
        Xem tệp ({value.length})
      </Button>

      <Modal
        width={800}
        open={open}
        centered
        title={`Tệp đã tải lên (${value.length})`}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="close" onClick={() => setOpen(false)}>
            Đóng
          </Button>,
        ]}
      >
        <List
          dataSource={value}
          renderItem={(item) => {
            const fileType = getFileType(item.url);
            const fileName = getFileName(item.public_id, item.url);

            return (
              <List.Item
                actions={[
                  <a
                    href={item.url}
                    target="_blank"
                    download={fileName}
                    key="download"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1"
                  >
                    <BiDownload className="text-lg" /> Tải xuống
                  </a>,
                ]}
              >
                <List.Item.Meta
                  title={fileName}
                  description={
                    <>
                      {fileType === "image" && (
                        <Image
                          height={80}
                          src={item.url}
                          preview={{ src: item.url }}
                        />
                      )}
                      {fileType === "video" && (
                        <video
                          height={80}
                          controls
                          src={item.url}
                          style={{ maxHeight: "100px" }}
                        />
                      )}
                      {fileType === "pdf" && (
                        <Text>
                          PDF -{" "}
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Xem trước
                          </a>
                        </Text>
                      )}
                      {fileType === "doc" && <Text>Word Document</Text>}
                      {fileType === "excel" && <Text>Excel Spreadsheet</Text>}
                      {fileType === "unknown" && (
                        <Text>Tệp không xác định</Text>
                      )}
                    </>
                  }
                />
              </List.Item>
            );
          }}
        />
      </Modal>
    </>
  );
};

const ModalSignature = ({
  value,
}: {
  value: {
    url: string;
    public_id: string;
  };
}) => {
  return (
    <>
      <Image key={value?.public_id} height={40} src={value?.url || undefined} />
    </>
  );
};

const ModalEditText = ({ value }: { value: string | undefined | null }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Button type="link" onClick={() => setOpen(true)}>
        Xem chi tiết
      </Button>
      <Modal
        centered
        width={800}
        open={open}
        okText="Đóng"
        onCancel={() => setOpen(false)}
        cancelButtonProps={{ style: { display: "none" } }}
        onClose={() => setOpen(false)}
        onOk={() => setOpen(false)}
        title="Nội dung"
      >
        <div className="w-full">
          <div className="prose">{parse(value || "")}</div>
        </div>
      </Modal>
    </>
  );
};

const ModalViewText = ({ value }: { value: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Button type="link" onClick={() => setOpen(true)}>
        Xem chi tiết
      </Button>
      <Modal
        centered
        width={800}
        open={open}
        okText="Đóng"
        onCancel={() => setOpen(false)}
        cancelButtonProps={{ style: { display: "none" } }}
        onClose={() => setOpen(false)}
        onOk={() => setOpen(false)}
        title="Nội dung"
      >
        <div className="w-full">
          <div className="prose">{parse(value)}</div>
        </div>
      </Modal>
    </>
  );
};

export const RenderResponseData = (
  blockType: FormBlockType,
  value: unknown,
) => {
  switch (blockType) {
    case "InputNumber":
      return value ?? "-";
    case "DatePicker":
      return formatDate(value as string);
    case "TimePicker":
      return formatTime(value as string);
    case "RangePicker":
      return Array.isArray(value)
        ? value.map((val) => formatDate(val as string)).join(" - ")
        : formatDate(value as string);
    case "Signature":
      return value ? (
        <ModalSignature value={value as { url: string; public_id: string }} />
      ) : (
        "-"
      );
    case "Uploader":
      return value ? (
        <ModalUploader value={value as { url: string; public_id: string }[]} />
      ) : (
        "-"
      );
    case "EditorText":
      return value ? <ModalEditText value={value as string} /> : "-";
    case "CheckBox":
      return Array.isArray(value) ? value.join(", ") : "-";
    case "TextArea":
      return value ? <ModalViewText value={value as string} /> : "-";
    default:
      return value ?? "-";
  }
};

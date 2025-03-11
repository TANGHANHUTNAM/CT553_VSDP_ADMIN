import { Button, Image, List, Modal, Typography } from "antd";
import { useState } from "react";
import { BiDownload } from "react-icons/bi";
const { Text } = Typography;
interface IModalViewUploaderProps {
  value: {
    url: string;
    public_id: string;
  }[];
}

const ModalViewUploader: React.FC<IModalViewUploaderProps> = ({ value }) => {
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

export default ModalViewUploader;

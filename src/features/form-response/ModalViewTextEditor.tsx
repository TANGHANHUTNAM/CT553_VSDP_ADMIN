import { Button, Modal } from "antd";
import { useState } from "react";
import parse from "html-react-parser";
interface IModalViewTextEditorProps {
  value: string;
}

const ModalViewTextEditor: React.FC<IModalViewTextEditorProps> = ({
  value,
}) => {
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

export default ModalViewTextEditor;

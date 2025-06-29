import { Button, Modal } from "antd";

import { useState } from "react";
import parse from "html-react-parser";

interface IModalUpdateDescriptionFormProps {
  titleButton?: string;
  value: string;
}

const ModalUpdateDescriptionForm: React.FC<
  IModalUpdateDescriptionFormProps
> = ({ value, titleButton = "Click" }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button size="small" onClick={() => setOpen(true)}>
        {titleButton}
      </Button>
      <Modal
        open={open}
        onOk={() => setOpen(false)}
        title={`Xem miêu tả`}
        onCancel={() => setOpen(false)}
        cancelText="Đóng"
        centered
        width={800}
        destroyOnClose
        okButtonProps={{
          className: "hidden",
        }}
      >
        <p
          style={{
            width: "100%",
          }}
          className="prose"
        >
          {parse(value)}
        </p>
      </Modal>
    </>
  );
};

export default ModalUpdateDescriptionForm;

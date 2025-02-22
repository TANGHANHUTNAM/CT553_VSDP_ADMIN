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
        cancelText="Hủy"
        maskClosable={false}
        centered
        width={1000}
        destroyOnClose
        okButtonProps={{
          className: "hidden",
        }}
      >
        <div className="prose">{parse(value)}</div>
      </Modal>
    </>
  );
};

export default ModalUpdateDescriptionForm;

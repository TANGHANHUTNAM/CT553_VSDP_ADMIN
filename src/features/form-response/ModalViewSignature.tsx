import { Image } from "antd";

interface IModalViewSignatureProps {
  value: {
    url: string;
    public_id: string;
  };
}

const ModalViewSignature: React.FC<IModalViewSignatureProps> = ({ value }) => {
  return (
    <>
      <Image key={value?.public_id} height={40} src={value?.url || undefined} />
    </>
  );
};

export default ModalViewSignature;

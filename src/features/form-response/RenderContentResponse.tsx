import { formatDate, formatTime } from "../../utils/functionUtils";
import ModalViewSignature from "./ModalViewSignature";
import ModalViewTextEditor from "./ModalViewTextEditor";
import ModalViewUploader from "./ModalViewUploader";

interface IRenderContentResponseProps {
  blockType: string;
  value:
    | string
    | number
    | string[]
    | number[]
    | { url: string; public_id: string }
    | { url: string; public_id: string }[]
    | null
    | undefined;
}

const RenderContentResponse: React.FC<IRenderContentResponseProps> = ({
  blockType,
  value,
}) => {
  switch (blockType) {
    case "InputNumber":
      return <>{value ?? "-"}</>;
    case "DatePicker":
      return <>{formatDate(value as string)}</>;
    case "TimePicker":
      return <>{formatTime(value as string)}</>;
    case "RangePicker":
      return (
        <>
          {Array.isArray(value)
            ? value.map((val) => formatDate(val as string)).join(" - ")
            : formatDate(value as string)}
        </>
      );
    case "Signature":
      return value ? (
        <ModalViewSignature
          value={value as { url: string; public_id: string }}
        />
      ) : (
        "-"
      );
    case "Uploader":
      return value ? (
        <ModalViewUploader
          value={value as { url: string; public_id: string }[]}
        />
      ) : (
        "-"
      );
    case "EditorText":
      return value ? <ModalViewTextEditor value={value as string} /> : "-";
    case "CheckBox":
      return <>{Array.isArray(value) ? value.join(", ") : "-"}</>;
    case "TextArea":
      return value ? <ModalViewTextEditor value={value as string} /> : "-";
    default:
      return <>{value ?? "-"}</>;
  }
};

export default RenderContentResponse;

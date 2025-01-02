import { Input } from "antd";
import { IoMdSearch } from "react-icons/io";

interface IInputSearchComponentProps {
  className?: string | undefined;
  placeholder?: string | undefined;
  size?: "large" | "middle" | "small" | undefined;
  allowClear?: boolean | undefined;
  prefix: React.ReactNode | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputSearchComponent: React.FC<IInputSearchComponentProps> = ({
  className,
  placeholder,
  size,
  allowClear,
  prefix,
  onChange,
}) => {
  return (
    <>
      <Input
        className={`${className} border border-solid border-gray-300 dark:border-dark-600`}
        placeholder={placeholder || "Search..."}
        allowClear={allowClear || true}
        size={size || "large"}
        prefix={prefix || <IoMdSearch className="text-xl" />}
        onChange={onChange}
      />
    </>
  );
};

export default InputSearchComponent;

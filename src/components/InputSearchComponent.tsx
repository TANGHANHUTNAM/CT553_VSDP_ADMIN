import { Input } from "antd";

interface IInputSearchComponentProps {
  className?: string | undefined;
  placeholder?: string | undefined;
  size?: "large" | "middle" | "small" | undefined;
  allowClear?: boolean | undefined;
  prefix?: React.ReactNode | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string | undefined;
  value?: string | undefined;
  enterButton?: boolean | React.ReactNode | undefined;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputSearchComponent: React.FC<IInputSearchComponentProps> = ({
  className,
  placeholder,
  size,
  allowClear,
  prefix,
  defaultValue,
  value,
  enterButton,
  onSearch,
  onClear,
  onChange,
  onClick,
  // onPressEnter,
}) => {
  return (
    <>
      <Input.Search
        className={`${className} rounded-md`}
        placeholder={placeholder || "Search..."}
        allowClear={allowClear || true}
        size={size || "large"}
        prefix={prefix}
        defaultValue={defaultValue}
        value={value}
        enterButton={enterButton}
        onChange={onChange}
        onSearch={onSearch}
        onClear={onClear}
        onClick={onClick}
        // onPressEnter={onPressEnter}
      />
    </>
  );
};

export default InputSearchComponent;

import { Switch, Tooltip } from "antd";

interface IActiveComponentProps {
  titleTooltip?: string | React.ReactNode | undefined;
  onChange: (checked: boolean) => void;
  defaultValue?: boolean | undefined;
  defaultChecked?: boolean | undefined;
  loading?: boolean | undefined;
  disabled?: boolean | undefined;
  value?: boolean | undefined;
  onClick?: (checked: boolean) => void;
}

const ActiveComponent: React.FC<IActiveComponentProps> = ({
  titleTooltip,
  onChange,
  defaultValue,
  defaultChecked,
  loading,
  disabled,
  value,
  onClick,
}) => {
  return (
    <div>
      <Tooltip title={titleTooltip}>
        <Switch
          checkedChildren="ON"
          unCheckedChildren="OFF"
          rootClassName=""
          size="small"
          onChange={onChange}
          defaultValue={defaultValue}
          defaultChecked={defaultChecked}
          loading={loading}
          disabled={disabled}
          value={value}
          onClick={onClick}
        />
      </Tooltip>
    </div>
  );
};

export default ActiveComponent;

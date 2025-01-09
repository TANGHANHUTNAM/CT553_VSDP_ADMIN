import { Switch, Tooltip } from "antd";

interface IActiveComponentProps {
  titleTooltip?: string | React.ReactNode | undefined;
  onChange?: (checked: boolean) => void;
  defaultValue?: boolean | undefined;
  defaultChecked?: boolean | undefined;
  loading?: boolean | undefined;
  disabled?: boolean | undefined;
  value?: boolean | undefined;
}

const ActiveComponent: React.FC<IActiveComponentProps> = ({
  titleTooltip,
  onChange,
  defaultValue,
  defaultChecked,
  loading,
  disabled,
  value,
}) => {
  return (
    <div>
      <Tooltip title={titleTooltip}>
        <Switch
          rootClassName=""
          size="small"
          onChange={onChange}
          defaultValue={defaultValue}
          defaultChecked={defaultChecked}
          loading={loading}
          disabled={disabled}
          value={value}
        />
      </Tooltip>
    </div>
  );
};

export default ActiveComponent;

import { Dropdown } from "antd";
import { ItemType } from "antd/es/menu/interface";
import ButtonComponent from "./ButtonComponent";
import { TbSettingsCode } from "react-icons/tb";

interface ITableSizeSettingComponentProps {
  items: ItemType[] | undefined;
  onClick: (key: string) => void;
  selectedKeys: string[];
}
const TableSizeSettingComponent: React.FC<ITableSizeSettingComponentProps> = ({
  items,
  onClick,
  selectedKeys,
}) => {
  return (
    <>
      <Dropdown
        menu={{
          items: items,
          onClick: ({ key }) => onClick(key),
          selectedKeys: selectedKeys,
        }}
      >
        <span>
          <ButtonComponent
            text=""
            textTooltip="Cài đặt mở rộng bảng"
            icon={<TbSettingsCode />}
            size="middle"
            type="primary"
          />
        </span>
      </Dropdown>
    </>
  );
};

export default TableSizeSettingComponent;

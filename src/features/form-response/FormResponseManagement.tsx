import type { MenuProps, TableColumnsType, TableProps } from "antd";
import { Checkbox, ConfigProvider, Table } from "antd";
import { createStyles } from "antd-style";
import Dropdown from "antd/es/dropdown/dropdown";
import { IoMdSearch } from "react-icons/io";
import { RiListSettingsFill } from "react-icons/ri";
import ButtonComponent from "../../components/ButtonComponent";
import InputSearchComponent from "../../components/InputSearchComponent";

import { useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import { PER_PAGE } from "../../constants/tableManagement";
import { IFormResponse } from "../../interfaces";
import { BiExport, BiReset } from "react-icons/bi";
import { GLOBAL_COLOR } from "../../constants/colorCustom";
const useStyle = createStyles(({ css }) => ({
  customTable: css`
    .ant-table {
      .ant-table-container {
        .ant-table-body,
        .ant-table-content {
          scrollbar-width: thin;
          scrollbar-color: #c4c6c6 transparent;
          scrollbar-gutter: stable;
        }
      }
    }
  `,
}));
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const dataSource = Array.from({ length: 100 }).map<DataType>((_, i) => ({
  key: i,
  name: `Edward King ${i}`,
  age: 32,
  address: `London, Park Lane no. ${i}`,
}));

interface IFormResponseManagementProps {
  formResponse: IFormResponse;
}

const FormResponseManagement: React.FC<IFormResponseManagementProps> = ({
  formResponse,
}) => {
  const { styles } = useStyle();
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(PER_PAGE);
  const columns: TableColumnsType<DataType> = [
    {
      title: "STT",
      key: "STT",
      width: 50,
      align: "center",
      render: (_, __, index) => (
        <span className="font-semibold">
          {(current - 1) * pageSize + index + 1}
        </span>
      ),
      fixed: "left",
    },
    {
      title: "Họ tên",
      width: 150,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Column 1",
      dataIndex: "address",
      key: "1",
      width: 150,
    },
    {
      title: "Column 2",
      dataIndex: "address",
      key: "2",
      width: 150,
    },
    {
      title: "Column 3",
      dataIndex: "address",
      key: "3",
      width: 150,
    },
    {
      title: "Column 4",
      dataIndex: "address",
      key: "4",
      width: 150,
    },
    {
      title: "Column 5",
      dataIndex: "address",
      key: "5",
      width: 150,
    },
    {
      title: "Column 6",
      dataIndex: "address",
      key: "6",
      width: 150,
    },
    {
      title: "Column 7",
      dataIndex: "address",
      key: "7",
      width: 150,
    },
    { title: "Column 8", dataIndex: "address", key: "8" },
    { title: "Column 9", dataIndex: "address", key: "9" },
    { title: "Column 10", dataIndex: "address", key: "10" },
    { title: "Column 11", dataIndex: "address", key: "11" },
    {
      title: "Hành động",
      key: "operation",
      fixed: "right",
      width: 100,
      render: () => <span>action</span>,
    },
  ];
  const defaultCheckedList = columns.map((item) => item.key);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const newColumns = columns.map((item) => ({
    ...item,
    hidden: !checkedList.includes(item.key as string),
  }));
  const menuSetting: MenuProps = {
    items: [
      {
        key: "1",
        label: (
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Checkbox.Group
              value={checkedList}
              options={columns.map(({ key, title }) => ({
                label: title as React.ReactNode,
                value: key,
              }))}
              onChange={(value) => {
                setCheckedList(value as React.Key[]);
              }}
              style={{}}
              className="flex h-[200px] w-[200px] flex-col gap-1 overflow-y-auto scrollbar-thin"
            />
          </div>
        ),
      },
      {
        key: "2",
        label: (
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <ButtonComponent
              text=""
              textTooltip="Reset"
              icon={<GrPowerReset />}
              size="small"
              type="primary"
              onclick={() => {
                setCheckedList(defaultCheckedList);
              }}
            />
          </div>
        ),
      },
    ],
  };
  const headerTableRender: TableProps<DataType>["title"] = () => (
    <div className="flex items-center justify-between">
      <div className="w-1/2 text-lg font-semibold">Phản hồi người dùng</div>
      <div className="flex w-1/2 items-center justify-end space-x-2">
        {/* Setting Display Column */}
        <Dropdown menu={menuSetting} trigger={["click"]}>
          <span>
            <ButtonComponent
              text=""
              textTooltip="Cài đặt hiển thị cột"
              icon={<RiListSettingsFill />}
              size="middle"
              type="primary"
            />
          </span>
        </Dropdown>
      </div>
    </div>
  );
  return (
    <div className="mx-auto flex min-h-[calc(100vh-90px)] w-full max-w-screen-xl flex-col space-y-3 rounded-md bg-[#f4f0f0] px-4 py-2">
      <div className="w-full rounded-md bg-primary px-4 py-2 text-2xl font-semibold text-white">
        Phản hồi biểu mẫu: {formResponse?.name || "Form Response"}
      </div>
      <div className="flex w-full items-center justify-between">
        <div>
          <InputSearchComponent
            // onSearch={handleSearch}
            size="middle"
            allowClear
            placeholder="name, email, phone..."
            enterButton={<IoMdSearch className="text-xl" />}
          />
        </div>
        <div className="flex items-center space-x-2">
          <ButtonComponent
            text="Xuất file"
            icon={<BiExport className="text-lg" />}
            size="middle"
            type="primary"
            onclick={() => {}}
            textTooltip="Xuất file"
          />
          <ButtonComponent
            text=""
            icon={<BiReset className="text-lg" />}
            size="middle"
            type="primary"
            onclick={() => {}}
            textTooltip="Reset"
          />
        </div>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              rowHoverBg: "#d3e8ea",
              headerBg: GLOBAL_COLOR,
              headerColor: "#fff",
            },
          },
        }}
      >
        <Table<DataType>
          title={headerTableRender}
          className={`${styles.customTable}`}
          loading={{
            spinning: false,
            tip: "Đang tải dữ liệu...",
          }}
          columns={newColumns}
          dataSource={dataSource}
          bordered
          sticky={true}
          size="small"
          scroll={{ x: "max-content", y: 55 * 6 }}
        />
      </ConfigProvider>
    </div>
  );
};

export default FormResponseManagement;

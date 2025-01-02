import { Space, Table, TableProps, Tag } from "antd";
import { FaCirclePlus } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import { CgImport } from "react-icons/cg";
import { CgExport } from "react-icons/cg";

import ButtonComponent from "../../components/ButtonComponent";
import InputSearchComponent from "../../components/InputSearchComponent";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const UserManagement: React.FC = () => {
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="w-1/2">
          <InputSearchComponent
            onChange={(e) => {
              console.log(e.target.value);
            }}
            prefix={<IoMdSearch className="text-xl" />}
            size="large"
            allowClear
            placeholder="Tìm kiếm..."
            className="w-1/2"
          />
        </div>
        <div className="flex w-1/2 items-center justify-end space-x-2">
          <ButtonComponent
            text="Xuất file"
            icon={<CgExport className="" />}
            size="large"
            type="primary"
          />
          <ButtonComponent
            text="Nhập file"
            icon={<CgImport className="" />}
            size="large"
            type="primary"
          />
          <ButtonComponent
            text="Thêm mới"
            icon={<FaCirclePlus className="" />}
            size="large"
            type="primary"
          />
        </div>
      </div>

      <Table<DataType> columns={columns} dataSource={data} />
    </div>
  );
};

export default UserManagement;

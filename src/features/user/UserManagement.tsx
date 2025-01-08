import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Checkbox,
  Dropdown,
  MenuProps,
  Space,
  Table,
  TableColumnsType,
  TableProps,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import { CgExport, CgImport } from "react-icons/cg";
import { FaCirclePlus } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";
import { IoMdSearch } from "react-icons/io";
import { RiListSettingsFill } from "react-icons/ri";
import { useSearchParams } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent";
import DeleteComponent from "../../components/DeleteComponent";
import EditComponent from "../../components/EditComponent";
import InputSearchComponent from "../../components/InputSearchComponent";
import TableSizeSettingComponent from "../../components/TableSizeSettingComponent";
import ViewComponent from "../../components/ViewComponent";
import { IUsersResponse } from "../../interfaces";
import { getUsersService } from "../../services";
import Access from "../../router/Access";
import { ALL_PERMISSIONS } from "../../constants/permissions";
import ActiveComponent from "../../components/ActiveComponent";

const UserManagement: React.FC = () => {
  const PER_PAGE = 10;
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedKeyDropdownExpand, setSelectedKeyDropdownExpand] =
    useState<string>("small");
  const [current, setCurrent] = useState<number>(
    Number(searchParams.get("current")) || 1,
  );
  const [pageSize, setPageSize] = useState<number>(
    Number(searchParams.get("pageSize")) || PER_PAGE,
  );
  const [search, setSearch] = useState<string>(
    searchParams.get("search") || "",
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrent(1);
  };

  useEffect(() => {
    searchParams.set("search", search);
    if (search === "") {
      searchParams.delete("search");
    }
    searchParams.set("current", current.toString());
    searchParams.set("pageSize", pageSize.toString());
    setSearchParams(searchParams);
  }, [current, pageSize, search, searchParams, setSearchParams]);

  const { data, isLoading } = useQuery({
    queryKey: ["users", current, pageSize, search],
    queryFn: () => getUsersService(`?${searchParams.toString()}`),
  });

  const columns: TableColumnsType<IUsersResponse> = [
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
    },
    {
      title: "Người dùng",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <Space size={"middle"}>
          <Avatar src={record.avatar || undefined} />
          <span>{record.name}</span>
        </Space>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (_, record) => <span>{record?.role?.name}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "active",
      key: "active",
      render: (_, record) => (
        <Tag color={record.active ? "green" : "red"}>
          {record.active ? "Hoạt động" : "Không hoạt động"}
        </Tag>
      ),
    },
    {
      title: "Thời gian tạo",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at) => {
        return new Date(created_at).toLocaleString("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
      },
    },
    {
      title: "Thời gian cập nhập",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (updated_at) => {
        return new Date(updated_at).toLocaleString("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
      },
    },
    {
      title: "Thao tác",
      key: "action",
      align: "center",
      width: 150,
      render: (_, record) => (
        <Space size={"middle"}>
          <Access
            hideChildren
            permission={{
              module: ALL_PERMISSIONS.USER.GET_BY_ID.module,
              method: ALL_PERMISSIONS.USER.GET_BY_ID.method,
              api_path: ALL_PERMISSIONS.USER.GET_BY_ID.api_path,
            }}
          >
            <ViewComponent titleTooltip="Xem chi tiết" />
          </Access>

          <Access
            hideChildren
            permission={{
              module: ALL_PERMISSIONS.USER.UPDATE.module,
              method: ALL_PERMISSIONS.USER.UPDATE.method,
              api_path: ALL_PERMISSIONS.USER.UPDATE.api_path,
            }}
          >
            <EditComponent titleTooltip="Chỉnh sửa" />
          </Access>

          <Access
            hideChildren
            permission={{
              module: ALL_PERMISSIONS.USER.DELETE.module,
              method: ALL_PERMISSIONS.USER.DELETE.method,
              api_path: ALL_PERMISSIONS.USER.DELETE.api_path,
            }}
          >
            <ActiveComponent titleTooltip="Kích hoạt" />
          </Access>
        </Space>
      ),
    },
  ];

  const handleOnChangeTable: TableProps<IUsersResponse>["onChange"] = (
    pagination,
  ) => {
    if (pagination.current !== current) {
      setCurrent(pagination.current || 1);
    }
    if (pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize || PER_PAGE);
    }
  };

  const headerTableRender: TableProps<IUsersResponse>["title"] = () => (
    <div className="flex items-center justify-between">
      <div className="w-1/2 text-base font-semibold">Danh sách người dùng</div>
      <div className="flex w-1/2 items-center justify-end space-x-2">
        <TableSizeSettingComponent
          items={itemsDropdownExpand}
          onClick={(key) => setSelectedKeyDropdownExpand(key)}
          selectedKeys={[selectedKeyDropdownExpand || "small"]}
        />
        {/* Setting Display Column */}
        <Dropdown menu={menuSetting} trigger={["hover"]}>
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

  // Setting Display Column
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
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            />
          </div>
        ),
      },
    ],
  };

  const itemsDropdownExpand: MenuProps["items"] = [
    {
      key: "lagre",
      label: "Kích thước bảng lớn",
    },
    {
      key: "middle",
      label: "Kích thước bảng trung bình",
    },
    {
      key: "small",
      label: "Kích thước bảng nhỏ",
    },
  ];

  const handleReset = () => {
    setCurrent(1);
    setPageSize(PER_PAGE);
    setSearch("");
    setSelectedKeyDropdownExpand("small");
    setCheckedList(defaultCheckedList);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="w-1/2">
          <InputSearchComponent
            onSearch={handleSearch}
            size="large"
            allowClear
            placeholder="Tìm kiếm..."
            className="w-1/2"
            enterButton={<IoMdSearch className="text-xl" />}
          />
        </div>
        <div className="flex w-1/2 items-center justify-end space-x-2">
          <ButtonComponent
            text="Xuất file"
            textTooltip="Xuất danh sách người dùng"
            icon={<CgExport className="" />}
            size="large"
            type="primary"
          />
          <ButtonComponent
            text="Nhập file"
            textTooltip="Thêm danh sách người dùng"
            icon={<CgImport className="" />}
            size="large"
            type="primary"
          />
          <ButtonComponent
            text="Thêm mới"
            textTooltip="Thêm mới người dùng"
            icon={<FaCirclePlus className="" />}
            size="large"
            type="primary"
          />
          <ButtonComponent
            text=""
            textTooltip="Làm mới giá trị"
            icon={<GrPowerReset className="" />}
            size="large"
            type="primary"
            onclick={handleReset}
          />
        </div>
      </div>

      <Table<IUsersResponse>
        columns={newColumns}
        dataSource={data?.data?.users || []}
        size={selectedKeyDropdownExpand as "large" | "middle" | "small"}
        bordered
        title={headerTableRender}
        rowKey={(record) => record.id}
        loading={{
          spinning: isLoading,
          tip: "Đang tải dữ liệu...",
        }}
        pagination={{
          current,
          pageSize,
          total: data?.data?.pagination?.totalRecords,
          showTotal: (total) => `Tổng ${total} người dùng`,
          showSizeChanger: true,
          onShowSizeChange(current, pageSize) {
            if (pageSize !== current) {
              setCurrent(1);
            }
            setPageSize(pageSize);
          },
          pageSizeOptions: ["1", "5", "10", "20"],
        }}
        onChange={handleOnChangeTable}
      />
    </div>
  );
};

export default UserManagement;

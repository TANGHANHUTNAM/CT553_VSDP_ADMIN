import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
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
import toast from "react-hot-toast";
import { CgExport, CgImport } from "react-icons/cg";
import { FaCirclePlus } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";
import { IoMdSearch } from "react-icons/io";
import { RiListSettingsFill } from "react-icons/ri";
import { useSearchParams } from "react-router-dom";
import ActiveComponent from "../../components/ActiveComponent";
import AvatarComponent from "../../components/AvatarComponent";
import ButtonComponent from "../../components/ButtonComponent";
import EditComponent from "../../components/EditComponent";
import InputSearchComponent from "../../components/InputSearchComponent";
import TableSizeSettingComponent from "../../components/TableSizeSettingComponent";
import ViewComponent from "../../components/ViewComponent";
import { ALL_PERMISSIONS } from "../../constants/permissions";
import { PER_PAGE, SIZE_TABLE, STATUS } from "../../constants/tableManagement";
import { IResponse, IUserResponse, IUsersResponse } from "../../interfaces";
import Access from "../../router/Access";
import {
  getAllRolesService,
  getUsersService,
  updateStatusUserService,
} from "../../services";
import ModalViewDetailsUser from "./ModalViewDetailsUser";
import ModalCreateNewUser from "./ModalCreateNewUser";
import ModalUpdateUser from "./ModalUpdateUser";
import {
  colorFilterIcon,
  colorSortDownIcon,
  colorSortUpIcon,
  formatDateTime,
  paginationOptions,
} from "../../utils/functionUtils";
import {
  CaretDownFilled,
  CaretUpFilled,
  FilterFilled,
} from "@ant-design/icons";
import ModalImportListUser from "./ModalImportListUser";

const UserManagement: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openModalViewDetailsUser, setOpenModalViewDetailsUser] =
    useState<boolean>(false);
  const [openModalCreateNewUser, setOpenModalCreateNewUser] =
    useState<boolean>(false);
  const [openModalUpdateUser, setOpenModalUpdateUser] =
    useState<boolean>(false);

  const [openModalImportListUser, setOpenModalImportListUser] =
    useState<boolean>(false);
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
  const [filterRole, setFilterRole] = useState<string>(
    searchParams.get("role") || "",
  );
  const [filterStatus, setFilterStatus] = useState<string>(
    searchParams.get("status") || "",
  );
  const [sortByUpdatedAt, setSortByUpdatedAt] = useState<
    "ascend" | "descend" | ""
  >(searchParams.get("sortByUpdatedAt") as "ascend" | "descend" | "");

  const [userData, setUserData] = useState<IUsersResponse | null>(null);

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrent(1);
  };

  useEffect(() => {
    searchParams.set("search", search);
    if (search === "") {
      searchParams.delete("search");
    }
    searchParams.set("role", filterRole);
    if (!filterRole) {
      searchParams.delete("role");
    }
    searchParams.set("status", filterStatus);
    if (!filterStatus) {
      searchParams.delete("status");
    }
    searchParams.set("sortByUpdatedAt", sortByUpdatedAt || "");
    if (!sortByUpdatedAt) {
      searchParams.delete("sortByUpdatedAt");
    }
    searchParams.set("current", current.toString());
    searchParams.set("pageSize", pageSize.toString());
    setSearchParams(searchParams);
  }, [
    current,
    pageSize,
    search,
    filterRole,
    searchParams,
    sortByUpdatedAt,
    filterStatus,
    setSearchParams,
  ]);

  const { data, isFetching } = useQuery({
    queryKey: [
      "users",
      current,
      pageSize,
      search,
      filterRole,
      filterStatus,
      sortByUpdatedAt,
    ],
    queryFn: () => getUsersService(`?${searchParams.toString()}`),
  });

  const { data: dataAllRoles } = useQuery({
    queryKey: ["allRoles"],
    queryFn: async () => {
      const response = await getAllRolesService();
      return response.data;
    },
    select: (data) =>
      data?.map((item) => ({ label: item.name, value: item.id })),
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
        <Space size={"small"}>
          <AvatarComponent src={record.avatar_url} size={35} />
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
      filters: dataAllRoles?.map((item) => ({
        text: item.label,
        value: item.value,
      })),
      filterIcon: (filtered) => (
        <FilterFilled style={{ color: colorFilterIcon(filtered) }} />
      ),
      filterMultiple: false,
      filteredValue: filterRole ? [filterRole] : null,
      render: (_, record) => <span>{record?.role?.name}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "active",
      key: "active",
      width: 120,
      filterIcon: (filtered) => (
        <FilterFilled style={{ color: colorFilterIcon(filtered) }} />
      ),
      filterMultiple: false,
      filters: STATUS.map((item) => ({ text: item.label, value: item.value })),
      filteredValue: filterStatus ? [filterStatus] : null,
      render: (_, record) => (
        <Tag color={record.active ? "green" : "red"}>
          {record.active ? "Hoạt động" : "Không hoạt động"}
        </Tag>
      ),
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "end_date",
      key: "end_date",
      render: (end_date) => {
        return formatDateTime(end_date);
      },
    },
    {
      title: "Thời gian cập nhập",
      dataIndex: "updated_at",
      key: "updated_at",
      sorter: true,
      sortOrder: sortByUpdatedAt || undefined,
      sortIcon: ({ sortOrder }) => (
        <div className="flex flex-col text-[10px]">
          <CaretUpFilled style={{ color: colorSortUpIcon(sortOrder) }} />
          <CaretDownFilled style={{ color: colorSortDownIcon(sortOrder) }} />
        </div>
      ),
      render: (updated_at) => {
        return formatDateTime(updated_at);
      },
    },
    {
      title: "Thao tác",
      key: "action",
      align: "center",
      width: 150,
      render: (_, record) => (
        <Space size={"middle"}>
          <Access hideChildren permission={ALL_PERMISSIONS.USER.GET_BY_ID}>
            <ViewComponent
              titleTooltip={`Xem chi tiết ${record.name}`}
              onClick={() => {
                setOpenModalViewDetailsUser(true);
                setUserData(record);
              }}
            />
          </Access>

          <Access hideChildren permission={ALL_PERMISSIONS.USER.UPDATE}>
            <EditComponent
              titleTooltip={`Chỉnh sửa ${record.name}`}
              onClick={() => {
                setOpenModalUpdateUser(true);
                setUserData(record);
              }}
            />
          </Access>

          <Access hideChildren permission={ALL_PERMISSIONS.USER.UPDATE_STATUS}>
            <ActiveComponent
              titleTooltip={`${record.active ? "Khóa tài khoản" : "Mở tài khoản"} ${
                record.name
              }`}
              defaultValue={record.active}
              value={record.active}
              loading={mutation.isPending}
              onChange={(checked) => {
                mutation.mutate({
                  id: record.id,
                  status: checked ? 1 : 0,
                });
              }}
            />
          </Access>
        </Space>
      ),
    },
  ];

  const handleOnChangeTable: TableProps<IUsersResponse>["onChange"] = (
    pagination,
    filters,
    sorter,
  ) => {
    if (pagination.current !== current) {
      setCurrent(pagination.current || 1);
    }
    if (pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize || PER_PAGE);
    }
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (key === "role") {
          if (value && value[0]) {
            setFilterRole(value[0] as string);
          }
        }
      });
      Object.entries(filters).forEach(([key, value]) => {
        if (key === "active") {
          if (value && value[0]) {
            setFilterStatus(value[0] as string);
          }
        }
      });
    }
    if (!filters.role) {
      setFilterRole("");
    }
    if (!filters.active) {
      setFilterStatus("");
    }
    if (sorter) {
      if (!Array.isArray(sorter) && sorter.field === "updated_at") {
        setSortByUpdatedAt(
          sorter.order === "ascend"
            ? "ascend"
            : sorter.order === "descend"
              ? "descend"
              : "",
        );
      }
      if (!Array.isArray(sorter) && !sorter.field) {
        setSortByUpdatedAt("");
      }
    }
  };

  const mutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: number }) => {
      const res: IResponse<IUserResponse> = await updateStatusUserService(
        id,
        status,
      );
      return res;
    },
    onSuccess: (data) => {
      if (data && data.data) {
        toast.success(data.message as string);
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
      }
      if (data && data.error) {
        toast.error(data.message as string);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

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

  const itemsDropdownExpand: MenuProps["items"] = SIZE_TABLE;

  const handleReset = () => {
    setCurrent(1);
    setPageSize(PER_PAGE);
    setSearch("");
    setFilterRole("");
    setFilterStatus("");
    setSortByUpdatedAt("");
    setSelectedKeyDropdownExpand("small");
    setCheckedList(defaultCheckedList);
  };

  return (
    <>
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
          <Access
            hideChildren
            permission={ALL_PERMISSIONS.USER.CREATE_LIST_USERS}
          >
            <ButtonComponent
              text="Nhập file"
              textTooltip="Thêm danh sách người dùng"
              icon={<CgImport className="" />}
              size="large"
              type="primary"
              onclick={() => setOpenModalImportListUser(true)}
            />
          </Access>
          <Access hideChildren permission={ALL_PERMISSIONS.USER.CREATE}>
            <ButtonComponent
              text="Thêm mới"
              textTooltip="Thêm mới người dùng"
              icon={<FaCirclePlus className="" />}
              size="large"
              type="primary"
              onclick={() => setOpenModalCreateNewUser(true)}
            />
          </Access>
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
          spinning: isFetching,
          tip: "Đang tải dữ liệu...",
        }}
        pagination={paginationOptions(
          current,
          setCurrent,
          pageSize,
          setPageSize,
          data?.data?.pagination.totalRecords || 0,
          "người dùng",
        )}
        onChange={handleOnChangeTable}
      />
      <ModalViewDetailsUser
        open={openModalViewDetailsUser}
        setOpen={setOpenModalViewDetailsUser}
        userData={userData}
      />
      <ModalCreateNewUser
        open={openModalCreateNewUser}
        setOpen={setOpenModalCreateNewUser}
        dataAllRoles={dataAllRoles as { label: string; value: number }[]}
      />
      <ModalUpdateUser
        open={openModalUpdateUser}
        setOpen={setOpenModalUpdateUser}
        userData={userData as IUsersResponse}
        dataAllRoles={dataAllRoles as { label: string; value: number }[]}
      />
      <ModalImportListUser
        open={openModalImportListUser}
        setOpen={setOpenModalImportListUser}
        dataAllRoles={dataAllRoles as { label: string; value: number }[]}
      />
    </>
  );
};

export default UserManagement;

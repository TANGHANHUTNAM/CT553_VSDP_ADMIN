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
import { FaCirclePlus } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";
import { IoMdSearch } from "react-icons/io";
import { LuFileKey2 } from "react-icons/lu";

import { RiListSettingsFill } from "react-icons/ri";
import { useSearchParams } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent";
import EditComponent from "../../components/EditComponent";
import InputSearchComponent from "../../components/InputSearchComponent";
import TableSizeSettingComponent from "../../components/TableSizeSettingComponent";
import { ALL_PERMISSIONS } from "../../constants/permissions";
import { PER_PAGE, SIZE_TABLE, STATUS } from "../../constants/tableManagement";
import { IResponse, IRoleResponse } from "../../interfaces";
import Access from "../../router/Access";
import {
  getAllRolesWithPaginationService,
  updateStatusRoleService,
} from "../../services";
import {
  colorFilterIcon,
  colorSortDownIcon,
  colorSortUpIcon,
  formatDateTime,
  paginationOptions,
} from "../../utils/functionUtils";
import ModalCreateNewRole from "./ModalCreateNewRole";
import ModalUpdateRole from "./ModalUpdateRole";
import ActiveComponent from "../../components/ActiveComponent";
import toast from "react-hot-toast";
import {
  CaretDownFilled,
  CaretUpFilled,
  FilterFilled,
} from "@ant-design/icons";
import ViewComponent from "../../components/ViewComponent";
import ModalUpdateListPermissionsRole from "./ModalUpdateListPermissionsRole";

const RoleManagement: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openModalCreateNewRole, setOpenModalCreateNewRole] =
    useState<boolean>(false);
  const [openModalUpdateRole, setOpenModalUpdateRole] =
    useState<boolean>(false);
  const [
    openModalUpdateListPermissionsRole,
    setOpenModalUpdateListPermissionsRole,
  ] = useState<boolean>(false);
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
  const [filterStatus, setFilterStatus] = useState<string>(
    searchParams.get("status") || "",
  );
  const [sortByUpdatedAt, setSortByUpdatedAt] = useState<
    "ascend" | "descend" | ""
  >(searchParams.get("sortByUpdatedAt") as "ascend" | "descend" | "");

  const [dataDetailRole, setDataDetailRole] = useState<IRoleResponse | null>(
    null,
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
    sortByUpdatedAt,
    searchParams,
    filterStatus,
    setSearchParams,
  ]);

  const { data, isFetching } = useQuery({
    queryKey: [
      "roles",
      current,
      pageSize,
      search,
      filterStatus,
      sortByUpdatedAt,
    ],
    queryFn: () =>
      getAllRolesWithPaginationService(`?${searchParams.toString()}`),
  });

  const mutationUpdateStatusRole = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: number }) => {
      const response: IResponse<IRoleResponse> = await updateStatusRoleService(
        id,
        status,
      );
      return response;
    },
    onSuccess: (data) => {
      if (data && data.data) {
        toast.success(data.message as string);
        queryClient.invalidateQueries({
          queryKey: ["roles"],
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

  const columns: TableColumnsType<IRoleResponse> = [
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
      title: "Tên quyền hạn",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Trạng thái",
      dataIndex: "active",
      key: "active",
      width: 120,
      filterMultiple: false,
      filters: STATUS.map((item) => ({ text: item.label, value: item.value })),
      filteredValue: filterStatus ? [filterStatus] : null,
      filterIcon: (filtered) => (
        <FilterFilled style={{ color: colorFilterIcon(filtered) }} />
      ),
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
        return formatDateTime(created_at);
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
          <Access
            hideChildren
            permission={ALL_PERMISSIONS.ROLE.UPDATE_ROLE_PERMISSION}
          >
            <ViewComponent
              titleTooltip={`Thiết lập quyền hạn ${record.name}`}
              onClick={() => {
                setOpenModalUpdateListPermissionsRole(true);
                setDataDetailRole(record);
              }}
              icon={<LuFileKey2 className="text-xl" />}
            />
          </Access>
          <Access hideChildren permission={ALL_PERMISSIONS.ROLE.UPDATE}>
            <EditComponent
              titleTooltip={`Chỉnh sửa ${record.name}`}
              onClick={() => {
                setOpenModalUpdateRole(true);
                setDataDetailRole(record);
              }}
            />
          </Access>
          <Access hideChildren permission={ALL_PERMISSIONS.ROLE.UPDATE_STATUS}>
            <ActiveComponent
              titleTooltip={record?.active ? "Tắt kích hoạt" : "Kích hoạt"}
              defaultValue={record.active}
              value={record?.active}
              loading={mutationUpdateStatusRole.isPending}
              onChange={(checked) => {
                mutationUpdateStatusRole.mutate({
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

  const handleOnChangeTable: TableProps<IRoleResponse>["onChange"] = (
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
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (key === "active") {
          if (value && value[0]) {
            setFilterStatus(value[0] as string);
          }
        }
      });
    }
    if (!filters.active) {
      setFilterStatus("");
    }
  };

  // Setting Display Column
  const itemsDropdownExpand: MenuProps["items"] = SIZE_TABLE;
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

  const headerTableRender: TableProps<IRoleResponse>["title"] = () => (
    <div className="flex items-center justify-between">
      <div className="w-1/2 text-base font-semibold">Danh sách vai trò</div>
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

  const handleReset = () => {
    setCurrent(1);
    setPageSize(PER_PAGE);
    setSearch("");
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
          <Access hideChildren permission={ALL_PERMISSIONS.ROLE.CREATE}>
            <ButtonComponent
              text="Thêm mới"
              textTooltip="Thêm mới vai trò"
              icon={<FaCirclePlus className="" />}
              size="large"
              type="primary"
              onclick={() => setOpenModalCreateNewRole(true)}
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

      <Table<IRoleResponse>
        columns={newColumns}
        dataSource={data?.data?.roles || []}
        size={selectedKeyDropdownExpand as "large" | "middle" | "small"}
        bordered
        title={headerTableRender}
        rowKey={(record) => record.id as number}
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
          "vai trò",
        )}
        onChange={handleOnChangeTable}
      />
      <ModalCreateNewRole
        open={openModalCreateNewRole}
        setOpen={setOpenModalCreateNewRole}
      />
      <ModalUpdateRole
        open={openModalUpdateRole}
        setOpen={setOpenModalUpdateRole}
        dataDetailRole={dataDetailRole}
      />
      <ModalUpdateListPermissionsRole
        open={openModalUpdateListPermissionsRole}
        setOpen={setOpenModalUpdateListPermissionsRole}
        dataDetailRole={dataDetailRole}
      />
    </>
  );
};

export default RoleManagement;

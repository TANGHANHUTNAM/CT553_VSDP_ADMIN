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
import { RiListSettingsFill } from "react-icons/ri";
import { useSearchParams } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent";
import EditComponent from "../../components/EditComponent";
import InputSearchComponent from "../../components/InputSearchComponent";
import TableSizeSettingComponent from "../../components/TableSizeSettingComponent";
import {
  ALL_PERMISSIONS,
  dataMethod,
  dataModule,
} from "../../constants/permissions";
import { PER_PAGE } from "../../constants/tableManagement";
import { IPermissionResponse } from "../../interfaces";
import Access from "../../router/Access";
import {
  deletePermissionService,
  getAllPermissionsWithPagination,
} from "../../services/permission/permission-service";
import {
  colorFilterIcon,
  colorMethod,
  colorSortDownIcon,
  colorSortUpIcon,
  formatDateTime,
} from "../../utils/functionUtils";
import ModalCreateNewPermission from "./ModalCreateNewPermission";
import ModalUpdatePermission from "./ModalUpdatePermission";
import DeleteComponent from "../../components/DeleteComponent";
import toast from "react-hot-toast";
import {
  CaretDownFilled,
  CaretUpFilled,
  FilterFilled,
} from "@ant-design/icons";

const PermissionManagement: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openModalCreateNewPermission, setOpenModalCreateNewPermission] =
    useState<boolean>(false);
  const [openModalUpdatePermission, setOpenModalUpdatePermission] =
    useState<boolean>(false);
  const [selectedKeyDropdownExpand, setSelectedKeyDropdownExpand] =
    useState<string>("small");
  const [dataDetailPermission, setDataDetailPermission] =
    useState<IPermissionResponse>();

  const [current, setCurrent] = useState<number>(
    Number(searchParams.get("current")) || 1,
  );
  const [pageSize, setPageSize] = useState<number>(
    Number(searchParams.get("pageSize")) || PER_PAGE,
  );
  const [search, setSearch] = useState<string>(
    searchParams.get("search") || "",
  );
  const [filterMethod, setFilterMethod] = useState<string>(
    searchParams.get("method") || "",
  );
  const [filterModule, setFilterModule] = useState<string>(
    searchParams.get("module") || "",
  );
  const [sortByUpdatedAt, setSortByUpdatedAt] = useState<
    "ascend" | "descend" | ""
  >(searchParams.get("sortByUpdatedAt") as "ascend" | "descend" | "");

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrent(1);
  };

  useEffect(() => {
    searchParams.set("search", search);
    if (search === "") {
      searchParams.delete("search");
    }
    searchParams.set("method", filterMethod);
    if (!filterMethod) {
      searchParams.delete("method");
    }
    searchParams.set("module", filterModule);
    if (!filterModule) {
      searchParams.delete("module");
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
    searchParams,
    filterMethod,
    filterModule,
    sortByUpdatedAt,
    setSearchParams,
  ]);

  const { data, isFetching } = useQuery({
    queryKey: [
      "permissions",
      current,
      pageSize,
      search,
      sortByUpdatedAt,
      filterMethod,
      filterModule,
    ],
    queryFn: () =>
      getAllPermissionsWithPagination(`?${searchParams.toString()}`),
  });

  const mutationDeletePermission = useMutation({
    mutationFn: async (id: number) => {
      const response = await deletePermissionService(id);
      console.log(response);
      return response;
    },
    onSuccess: (data) => {
      if (data && data.data) {
        toast.success(data.message as string);
      }
      if (data && data.error) {
        toast.error(data.error as string);
      }
      queryClient.invalidateQueries({
        queryKey: ["permissions"],
      });
    },
  });

  const handleOnChangeTable: TableProps<IPermissionResponse>["onChange"] = (
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
        if (key === "method") {
          if (value && value[0]) {
            setFilterMethod(value[0] as string);
          }
        }
      });
      Object.entries(filters).forEach(([key, value]) => {
        if (key === "module") {
          if (value && value[0]) {
            setFilterModule(value[0] as string);
          }
        }
      });
    }
    if (!filters.method) {
      setFilterMethod("");
    }
    if (!filters.module) {
      setFilterModule("");
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

  const columns: TableColumnsType<IPermissionResponse> = [
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
      title: "Api Path",
      key: "api_path",
      dataIndex: "api_path",
      width: "15%",
    },
    {
      title: "Miêu tả",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Method",
      key: "method",
      dataIndex: "method",
      width: 100,
      filters: dataMethod,
      filterMultiple: false,
      filteredValue: filterMethod ? [filterMethod] : null,
      filterIcon: (filtered) => (
        <FilterFilled style={{ color: colorFilterIcon(filtered) }} />
      ),
      render: (method) => <Tag color={colorMethod(method)}>{method}</Tag>,
    },
    {
      title: "Module",
      key: "module",
      dataIndex: "module",
      width: 120,
      filters: dataModule,
      filterMultiple: false,
      filteredValue: filterModule ? [filterModule] : null,
      filterIcon: (filtered) => (
        <FilterFilled style={{ color: colorFilterIcon(filtered) }} />
      ),
      align: "center",
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
          <Access hideChildren permission={ALL_PERMISSIONS.PERMISSION.UPDATE}>
            <EditComponent
              titleTooltip={`Chỉnh sửa ${record.api_path}`}
              onClick={() => {
                setOpenModalUpdatePermission(true);
                setDataDetailPermission(record);
              }}
            />
          </Access>
          <Access hideChildren permission={ALL_PERMISSIONS.PERMISSION.DELETE}>
            <DeleteComponent
              titleTooltip={`Xóa ${record.api_path}`}
              titlePopconfirm={`Bạn có chắc muốn xóa ${record.api_path}?`}
              onConfirm={() => {
                mutationDeletePermission.mutate(record.id as number);
              }}
            />
          </Access>
        </Space>
      ),
    },
  ];

  // Setting Display Column
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

  const headerTableRender: TableProps<IPermissionResponse>["title"] = () => (
    <div className="flex items-center justify-between">
      <div className="w-1/2 text-base font-semibold">Danh sách quyền hạn</div>
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
    setFilterMethod("");
    setFilterModule("");
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
          <Access hideChildren permission={ALL_PERMISSIONS.PERMISSION.CREATE}>
            <ButtonComponent
              text="Thêm mới"
              textTooltip="Thêm mới quyền hạn"
              icon={<FaCirclePlus className="" />}
              size="large"
              type="primary"
              onclick={() => setOpenModalCreateNewPermission(true)}
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

      <Table<IPermissionResponse>
        columns={newColumns}
        dataSource={data?.data?.permissions || []}
        size={selectedKeyDropdownExpand as "large" | "middle" | "small"}
        bordered
        title={headerTableRender}
        rowKey={(record) => record.id as number}
        loading={{
          spinning: isFetching,
          tip: "Đang tải dữ liệu...",
        }}
        pagination={{
          current,
          pageSize,
          total: data?.data?.pagination?.totalRecords,
          showTotal: (total) => `Tổng ${total} quyền hạn`,
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
      <ModalCreateNewPermission
        open={openModalCreateNewPermission}
        setOpen={setOpenModalCreateNewPermission}
      />
      <ModalUpdatePermission
        open={openModalUpdatePermission}
        setOpen={setOpenModalUpdatePermission}
        dataDetailPermission={dataDetailPermission || null}
      />
    </>
  );
};

export default PermissionManagement;

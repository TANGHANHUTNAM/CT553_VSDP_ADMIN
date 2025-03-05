import { FilterFilled } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Checkbox,
  Dropdown,
  MenuProps,
  Modal,
  Space,
  Table,
  TableColumnsType,
  TableProps,
  Tag,
} from "antd";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { FaBan } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineEditCalendar } from "react-icons/md";
import { RiListSettingsFill } from "react-icons/ri";
import { useNavigate, useSearchParams } from "react-router-dom";
import ActiveComponent from "../../components/ActiveComponent";
import ButtonComponent from "../../components/ButtonComponent";
import EditComponent from "../../components/EditComponent";
import InputSearchComponent from "../../components/InputSearchComponent";
import TableSizeSettingComponent from "../../components/TableSizeSettingComponent";
import ViewComponent from "../../components/ViewComponent";
import { ALL_PERMISSIONS } from "../../constants/permissions";
import {
  PER_PAGE,
  SCOPE_FORM,
  SIZE_TABLE,
  STATUS_PUBLIC,
} from "../../constants/tableManagement";
import { IFormResponse } from "../../interfaces";
import Access from "../../router/Access";
import {
  copyFormService,
  getAllFormsWithPagination,
  updateStatusFormService,
} from "../../services";
import {
  colorFilterIcon,
  formatDate,
  paginationOptions,
} from "../../utils/functionUtils";
import ModalCreateNewForm from "./ModalCreateNewForm";
import ModalUpdateForm from "./ModalUpdateForm";
import { ROUTER_URL } from "../../constants/routerIndex";
import toast from "react-hot-toast";
import { TbCopyPlusFilled } from "react-icons/tb";

const FormManangement: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [openModalCreateNewForm, setOpenModalCreateNewForm] =
    useState<boolean>(false);
  const [openModalUpdateForm, setOpenModalUpdateForm] =
    useState<boolean>(false);

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

  const [filterStatus, setFilterStatus] = useState<string>(
    searchParams.get("status") || "",
  );
  const [filterScope, setFilterScope] = useState<string>(
    searchParams.get("scope") || "",
  );

  const [dataDetailForm, setDataDetailForm] = useState<IFormResponse | null>(
    null,
  );

  const [dataDescription, setDataDescription] = useState<IFormResponse | null>(
    null,
  );
  const [openModalDescription, setOpenModalDescription] =
    useState<boolean>(false);
  useEffect(() => {
    searchParams.set("search", search);
    if (search === "") {
      searchParams.delete("search");
    }
    searchParams.set("status", filterStatus);
    if (!filterStatus) {
      searchParams.delete("status");
    }
    searchParams.set("scope", filterScope);
    if (!filterScope) {
      searchParams.delete("scope");
    }
    searchParams.set("current", current.toString());
    searchParams.set("pageSize", pageSize.toString());
    setSearchParams(searchParams);
  }, [
    current,
    pageSize,
    search,
    searchParams,
    filterStatus,
    filterScope,
    setSearchParams,
  ]);

  const { data: dataForms, isFetching } = useQuery({
    queryKey: ["forms", current, pageSize, search, filterStatus, filterScope],
    queryFn: () => getAllFormsWithPagination(`?${searchParams.toString()}`),
  });

  const mutationUpdateFormStatus = useMutation({
    mutationFn: async ({
      id,
      is_default,
    }: {
      id: string;
      is_default: boolean;
    }) => updateStatusFormService(id, is_default),
    onSuccess: (data) => {
      if (data && data.data) {
        toast.success(data.message as string);
        queryClient.invalidateQueries({ queryKey: ["forms"] });
      }
      if (data && data.error) {
        toast.error(data.message as string);
      }
    },
  });

  const mutationCopyForm = useMutation({
    mutationFn: async (id: string) => copyFormService(id),
    onSuccess: (data) => {
      if (data && data.data) {
        toast.success(data.message as string);
        queryClient.invalidateQueries({ queryKey: ["forms"] });
      }
      if (data && data.error) {
        toast.error(data.message as string);
      }
    },
  });

  const columns: TableColumnsType<IFormResponse> = [
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
      title: "Tên biểu mẫu",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Mô tả",
      key: "description",
      dataIndex: "description",
      render: (_, record) => {
        return (
          <Tag
            className="cursor-pointer"
            color="geekblue-inverse"
            onClick={() => {
              setDataDescription(record);
              setOpenModalDescription(true);
            }}
          >
            xem chi tiết
          </Tag>
        );
      },
    },
    {
      title: "Mục đích",
      key: "scope",
      dataIndex: "scope",
      filterIcon: (filtered) => (
        <FilterFilled style={{ color: colorFilterIcon(filtered) }} />
      ),
      filterMultiple: false,
      filters: SCOPE_FORM.map((item) => ({
        text: item.label,
        value: item.value,
      })),
      filteredValue: filterScope ? [filterScope] : null,
    },
    {
      title: "Hiển thị giao diện",
      key: "is_default",
      dataIndex: "is_default",
      render: (is_default) => {
        return (
          <Tag color={is_default ? "green" : "red"}>
            {is_default ? "Đang chọn" : "Không chọn"}
          </Tag>
        );
      },
    },
    {
      title: "Thời gian tạo",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at) => {
        return formatDate(created_at);
      },
    },
    {
      title: "Thời hoạt động",
      dataIndex: "start_date",
      key: "start_date",
      render: (_, record) => {
        return (
          <>
            {formatDate(record.start_date)} - {formatDate(record.end_date)}
          </>
        );
      },
    },

    {
      title: "Trạng thái",
      dataIndex: "is_public",
      key: "is_public",
      filterIcon: (filtered) => (
        <FilterFilled style={{ color: colorFilterIcon(filtered) }} />
      ),
      filterMultiple: false,
      filters: STATUS_PUBLIC.map((item) => ({
        text: item.label,
        value: item.value,
      })),
      filteredValue: filterStatus ? [filterStatus] : null,
      render: (is_public) => {
        return (
          <Tag color={is_public ? "green" : "red"}>
            {is_public ? "Đã công khai" : "Đã khóa"}
          </Tag>
        );
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
            permission={ALL_PERMISSIONS.FORM.GET_BY_ID}
            hideChildren={false}
          >
            <ViewComponent
              titleTooltip={`Thiết kế biểu mẫu ${record.name}`}
              onClick={() => {
                navigate(ROUTER_URL.FORM_BUILDER_PAGE(record.id));
              }}
              icon={<MdOutlineEditCalendar className="text-lg" />}
            />
          </Access>
          <Access
            permission={ALL_PERMISSIONS.FORM.GET_BY_ID}
            hideChildren={false}
          >
            <ViewComponent
              titleTooltip={`Sao chép biểu mẫu ${record.name}`}
              onClick={() => {
                mutationCopyForm.mutate(record.id);
              }}
              icon={<TbCopyPlusFilled className="text-lg text-orange-400" />}
            />
          </Access>
          <Access permission={ALL_PERMISSIONS.FORM.UPDATE} hideChildren={false}>
            <EditComponent
              titleTooltip={`Chỉnh sửa ${record.name}`}
              onClick={() => {
                setOpenModalUpdateForm(true);
                setDataDetailForm(record);
              }}
            />
          </Access>
          {record.scope === SCOPE_FORM[0].value ? (
            <ActiveComponent
              loading={mutationUpdateFormStatus.isPending}
              titleTooltip={
                record.is_default
                  ? "Đang hiển thị trên giao diện"
                  : "Chọn hiển thị giao diện"
              }
              onChange={(checked) => {
                mutationUpdateFormStatus.mutate({
                  id: record.id,
                  is_default: checked,
                });
              }}
              // disabled={record.is_default}
              defaultChecked={record.is_default}
              value={record.is_default}
            />
          ) : (
            <FaBan className="cursor-not-allowed text-lg text-red-500" />
          )}
        </Space>
      ),
    },
  ];

  const handleOnChangeTable: TableProps<IFormResponse>["onChange"] = (
    pagination,
    filters,
  ) => {
    if (pagination.current !== current) {
      setCurrent(pagination.current || 1);
    }
    if (pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize || PER_PAGE);
    }
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (key === "is_public") {
          if (value && value[0]) {
            setFilterStatus(value[0] as string);
          }
        }
      });

      Object.entries(filters).forEach(([key, value]) => {
        if (key === "scope") {
          if (value && value[0]) {
            setFilterScope(value[0] as string);
          }
        }
      });
    }
    if (!filters.is_public) {
      setFilterStatus("");
    }
    if (!filters.scope) {
      setFilterScope("");
    }
  };

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

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrent(1);
  };
  const headerTableRender: TableProps<IFormResponse>["title"] = () => (
    <div className="flex items-center justify-between">
      <div className="w-1/2 text-base font-semibold">Danh sách biểu mẫu</div>
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
    setFilterScope("");
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
          <Access permission={ALL_PERMISSIONS.FORM.CREATE} hideChildren={true}>
            <ButtonComponent
              text="Thêm mới"
              textTooltip="Thêm mới biểu mẫu"
              icon={<FaCirclePlus className="" />}
              size="large"
              type="primary"
              onclick={() => setOpenModalCreateNewForm(true)}
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
      <Table<IFormResponse>
        columns={newColumns}
        dataSource={dataForms?.data?.forms || []}
        size={selectedKeyDropdownExpand as "large" | "middle" | "small"}
        bordered
        title={headerTableRender}
        rowKey={(record) => record.id as string}
        loading={{
          spinning: isFetching,
          tip: "Đang tải dữ liệu...",
        }}
        pagination={paginationOptions(
          current,
          setCurrent,
          pageSize,
          setPageSize,
          dataForms?.data?.pagination.totalRecords || 0,
          "biểu mẫu",
        )}
        onChange={handleOnChangeTable}
      />
      <ModalCreateNewForm
        open={openModalCreateNewForm}
        setOpen={setOpenModalCreateNewForm}
      />
      <ModalUpdateForm
        open={openModalUpdateForm}
        setOpen={setOpenModalUpdateForm}
        dataDetailForm={dataDetailForm}
      />
      <Modal
        open={openModalDescription}
        width={800}
        title="Chi tiết mô tả"
        onCancel={() => setOpenModalDescription(false)}
        afterClose={() => setDataDescription(null)}
        okButtonProps={{ style: { display: "none" } }}
        cancelText="Hủy"
        className=""
        centered
      >
        <div className="prose">{parse(dataDescription?.description || "")}</div>
      </Modal>
    </>
  );
};

export default FormManangement;

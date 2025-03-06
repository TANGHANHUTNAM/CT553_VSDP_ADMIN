import type {
  MenuProps,
  TableColumnsType,
  TablePaginationConfig,
  TableProps,
} from "antd";
import { Checkbox, ConfigProvider, Table } from "antd";
import { createStyles } from "antd-style";
import Dropdown from "antd/es/dropdown/dropdown";
import { IoMdSearch } from "react-icons/io";
import { RiListSettingsFill } from "react-icons/ri";
import ButtonComponent from "../../components/ButtonComponent";
import InputSearchComponent from "../../components/InputSearchComponent";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { BiExport, BiReset } from "react-icons/bi";
import { GrPowerReset } from "react-icons/gr";
import { GLOBAL_COLOR } from "../../constants/colorCustom";
import { PER_PAGE } from "../../constants/tableManagement";
import { IFormResponse } from "../../interfaces";
import { getFormResponseService } from "../../services";
import { useMemo, useState } from "react";

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
      .even-row {
        background-color: #e6f7ff;
      }
      .odd-row {
        background-color: #ffffff;
      }
      .even-row .ant-table-cell-fix-left,
      .even-row .ant-table-cell-fix-right {
        background-color: #e6f7ff;
      }
      .odd-row .ant-table-cell-fix-left,
      .odd-row .ant-table-cell-fix-right {
        background-color: #ffffff;
      }
      /* Khi hover */
      .ant-table-tbody > tr.even-row:hover > td,
      .ant-table-tbody > tr.odd-row:hover > td {
        background-color: #d3e8ea;
      }
      /* Khi sort, các ô dữ liệu trong cột được sort có màu đẹp hơn */
      .ant-table-tbody > tr > td.ant-table-column-sort {
        background-color: #bae7ff !important; /* Màu đẹp hơn, đậm hơn #e6f7ff */
        border-left: 1px solid #91d5ff; /* Viền trái nhẹ */
        border-right: 1px solid #91d5ff; /* Viền phải nhẹ */
      }
      /* Đảm bảo header không thay đổi màu khi sort */
      .ant-table-thead > tr > th.ant-table-column-sort {
        background-color: ${GLOBAL_COLOR} !important; /* Giữ màu header từ GLOBAL_COLOR */
      }
      .ant-table-cell-ellipsis {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  `,
}));

interface IFormResponseManagementProps {
  formResponse: IFormResponse;
  columns: TableColumnsType<unknown>;

  setSearchParams: (params: Record<string, string>) => void;
}

const calculateColumnWidth = (
  data: unknown[],
  columns: TableColumnsType<unknown>,
): TableColumnsType<unknown> => {
  const CHAR_WIDTH = 10;
  const MIN_WIDTH = 80;
  const MAX_WIDTH = 300;
  const PADDING = 20;

  return columns.map((col) => {
    if (!("dataIndex" in col)) return col;

    const key = col.dataIndex as string;
    let maxLength = String(col.title || "").length;

    data.forEach((row) => {
      const value = (row as Record<string, unknown>)[key];
      const length = String(value || "").length;
      if (length > maxLength) maxLength = length;
    });

    const calculatedWidth = Math.max(
      MIN_WIDTH,
      Math.min(maxLength * CHAR_WIDTH + PADDING, MAX_WIDTH),
    );

    return {
      ...col,
      width: calculatedWidth,
      ellipsis: true,
      className: "ant-table-cell-ellipsis",
      align: "center",
    };
  });
};

const FormResponseManagement: React.FC<IFormResponseManagementProps> = ({
  formResponse,
  columns,
  setSearchParams,
}) => {
  const { styles } = useStyle();
  const [searchParams] = useSearchParams();
  const [tableKey, setTableKey] = useState(Date.now());
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || PER_PAGE,
    total: 0,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20", "30"],
    showTotal: (total, range) =>
      `${range[0]}-${range[1]} của ${total} phản hồi`,
  });

  const [searchText, setSearchText] = useState<string>(
    searchParams.get("search") || "",
  );
  const [filters, setFilters] = useState<Record<string, string[]>>(
    JSON.parse(searchParams.get("filters") || "{}"),
  );
  const [universityId, setUniversityId] = useState<number | null>(
    searchParams.get("universityId")
      ? Number(searchParams.get("universityId"))
      : null,
  );
  const [status, setStatus] = useState<string | null>(
    searchParams.get("status") || null,
  );
  const [sort, setSort] = useState<{
    field: string;
    order: "ascend" | "descend";
  }>({
    field: searchParams.get("sortField") || "created_at",
    order: (searchParams.get("sortOrder") as "ascend" | "descend") || "descend",
  });

  const handleSearch = (value: string) => {
    setSearchText(value);
    setPagination((prev) => ({ ...prev, current: 1 }));
    setSearchParams({
      ...Object.fromEntries(searchParams),
      search: value,
      page: "1",
    });
  };

  const queryKey = useMemo(
    () => [
      "formResponses",
      {
        formId: formResponse.id,
        searchText,
        filters,
        sort,
        pagination: {
          current: pagination.current,
          pageSize: pagination.pageSize,
        },
        universityId,
        status,
      },
    ],
    [
      formResponse.id,
      searchText,
      filters,
      sort,
      pagination,
      universityId,
      status,
    ],
  );

  const { data: dataResponses, isFetching } = useQuery({
    queryKey,
    queryFn: async () =>
      getFormResponseService({
        current: pagination.current || 1,
        formId: formResponse.id,
        pageSize: pagination.pageSize || PER_PAGE,
        search: searchText,
        status: status,
        filters: Object.keys(filters).length > 0 ? filters : undefined,
        universityId: universityId,
        sortField: sort.field,
        sortOrder: sort.order as "ascend" | "descend",
      }),
    refetchOnWindowFocus: false,
  });

  const dynamicColumns = useMemo(() => {
    const data = dataResponses?.data?.data || [];
    return calculateColumnWidth(data, columns);
  }, [dataResponses, columns]);

  const handleTableChange: TableProps<unknown>["onChange"] = (
    newPagination: TablePaginationConfig,
    newFilters,
    sorter,
  ) => {
    const updatedFilters = Object.fromEntries(
      Object.entries(newFilters)
        .filter(([key, _]) => key !== "university" && key !== "status")
        .filter(([_, value]) => value !== null && value?.length > 0),
    );

    const newUniversityId =
      newFilters?.university && newFilters.university.length > 0
        ? Number(newFilters.university[0])
        : null;

    const newStatus =
      newFilters?.status && newFilters.status.length > 0
        ? (newFilters.status[0] as string)
        : null;

    const singleSorter = Array.isArray(sorter) ? sorter[0] : sorter;
    const newSort: { field: string; order: "ascend" | "descend" } =
      singleSorter.field && singleSorter.order
        ? {
            field: singleSorter.field as string,
            order: singleSorter.order as "ascend" | "descend",
          }
        : { field: "created_at", order: "ascend" };

    const newParams: Record<string, string> = {
      page: (newPagination.current || 1).toString(),
      pageSize: (newPagination.pageSize || PER_PAGE).toString(),
    };

    if (searchText) newParams.search = searchText;
    if (Object.keys(updatedFilters).length > 0)
      newParams.filters = JSON.stringify(updatedFilters);
    if (newUniversityId) newParams.universityId = newUniversityId.toString();
    if (newStatus) newParams.status = newStatus;
    if (newSort.field !== "created_at" || newSort.order !== "ascend") {
      newParams.sortField = newSort.field;
      newParams.sortOrder = newSort.order;
    }

    setSearchParams(newParams);
    setFilters(updatedFilters as Record<string, string[]>);
    setUniversityId(newUniversityId);
    setStatus(newStatus);
    setSort(newSort);
    setPagination((prev) => ({
      ...prev,
      current: newPagination.current,
      pageSize: newPagination.pageSize,
      total: dataResponses?.data?.pagination.totalRecords || prev.total,
    }));
  };

  const defaultCheckedList = columns.map((item) => item.key);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const newColumns = dynamicColumns?.map((item) => ({
    ...item,
    hidden: !checkedList.includes(item.key as string),
  }));

  const menuSetting: MenuProps = {
    items: [
      {
        key: "1",
        label: (
          <div onClick={(e) => e.stopPropagation()}>
            <Checkbox.Group
              value={checkedList}
              options={columns.map(({ key, title }) => ({
                label: title as React.ReactNode,
                value: key,
              }))}
              onChange={(value) => setCheckedList(value as React.Key[])}
              className="flex h-[200px] w-[200px] flex-col gap-1 overflow-y-auto scrollbar-thin"
            />
          </div>
        ),
      },
      {
        key: "2",
        label: (
          <div onClick={(e) => e.stopPropagation()}>
            <ButtonComponent
              text=""
              textTooltip="Reset"
              icon={<GrPowerReset />}
              size="small"
              type="primary"
              onclick={() => setCheckedList(defaultCheckedList)}
            />
          </div>
        ),
      },
    ],
  };

  const headerTableRender: TableProps<unknown>["title"] = () => (
    <div className="flex items-center justify-between">
      <div className="w-1/2 text-lg font-semibold">Phản hồi người dùng</div>
      <div className="flex w-1/2 items-center justify-end space-x-2">
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

  const handleReset = () => {
    setSearchText("");
    setFilters({});
    setUniversityId(null);
    setStatus(null);
    setSort({ field: "created_at", order: "descend" });
    setPagination({
      current: 1,
      pageSize: 10 | PER_PAGE,
      total: dataResponses?.data?.pagination.totalRecords || 0,
      showSizeChanger: true,
      pageSizeOptions: ["5", "10", "20", "30"],
      showTotal: (total, range) =>
        `${range[0]}-${range[1]} của ${total} phản hồi`,
    });
    setSearchParams({
      page: "1",
      pageSize: PER_PAGE.toString() || "10",
    });
    setTableKey(Date.now());
    // refetch();
  };
  return (
    <div className="mx-auto flex min-h-[calc(100vh-90px)] w-full max-w-screen-xl flex-col space-y-3 rounded-md bg-[#f4f0f0] px-4 py-2">
      <div className="flex w-full items-center justify-between rounded-md bg-primary px-4 py-2 text-2xl font-semibold text-white">
        <div>Phản hồi biểu mẫu: {formResponse?.name || "Form Response"}</div>
        <div className="text-base">Số cột: {columns.length | 0}</div>
      </div>
      <div className="flex w-full items-center justify-between">
        <div>
          <InputSearchComponent
            onSearch={handleSearch}
            size="middle"
            allowClear
            placeholder="name, email, phone..."
            enterButton={<IoMdSearch className="text-xl" />}
            defaultValue={searchText}
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
            onclick={() => {
              handleReset();
            }}
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
        <Table
          key={tableKey}
          title={headerTableRender}
          className={`${styles.customTable}`}
          loading={{ spinning: isFetching, tip: "Đang tải dữ liệu..." }}
          columns={newColumns}
          dataSource={dataResponses?.data?.data || []}
          bordered
          sticky={true}
          size="small"
          scroll={{ x: "max-content", y: 55 * 6 }}
          rowKey="id"
          pagination={{
            ...pagination,
            total: dataResponses?.data?.pagination.totalRecords || 0,
          }}
          onChange={handleTableChange}
          rowClassName={(_, index: number) =>
            index % 2 === 0 ? "even-row" : "odd-row"
          }
        />
      </ConfigProvider>
    </div>
  );
};

export default FormResponseManagement;

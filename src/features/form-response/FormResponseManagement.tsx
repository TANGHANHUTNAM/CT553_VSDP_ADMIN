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
import { useState } from "react";
import { BiExport, BiReset } from "react-icons/bi";
import { GrPowerReset } from "react-icons/gr";
import { GLOBAL_COLOR } from "../../constants/colorCustom";
import { PER_PAGE } from "../../constants/tableManagement";
import { IFormResponse } from "../../interfaces";
import { getFormResponseService } from "../../services";
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

interface IFormResponseManagementProps {
  formResponse: IFormResponse;
  columns: TableColumnsType<unknown>;
  pagination: TablePaginationConfig;
  setPagination: (pagination: TablePaginationConfig) => void;
}

const FormResponseManagement: React.FC<IFormResponseManagementProps> = ({
  formResponse,
  columns,
  pagination,
  setPagination,
}) => {
  const { styles } = useStyle();
  const [searchText, setSearchText] = useState<string>("");
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [universityId, setUniversityId] = useState<number | null>(null);
  const [sort, setSort] = useState({
    field: "created_at",
    order: "ascend",
  });

  const handleSearch = (value: string) => {
    setSearchText(value);
    setPagination({ ...pagination, current: 1 });
  };

  const { data: dataResponses, isFetching } = useQuery({
    queryKey: [
      "formResponses",
      {
        formId: formResponse.id,
        searchText,
        filters,
        sort,
        pagination,
        universityId,
      },
    ],
    queryFn: async () =>
      getFormResponseService({
        current: pagination.current || 1,
        formId: formResponse.id,
        pageSize: pagination.pageSize || PER_PAGE,
        search: searchText,
        filters: Object.keys(filters).length > 0 ? filters : undefined,
        universityId: universityId,
        sortField: sort.field,
        sortOrder: sort.order as "ascend" | "descend",
      }),
    refetchOnWindowFocus: false,
  });

  const handleTableChange: TableProps<any>["onChange"] = (
    newPagination: TablePaginationConfig,
    newFilters,
    sorter,
  ) => {
    setPagination({
      ...pagination,
      current: newPagination.current,
      pageSize: newPagination.pageSize,
      total: newPagination.total || 0,
    });

    const updatedFilters = Object.fromEntries(
      Object.entries(newFilters)
        .filter(([key, value]) => key !== "university")
        .filter(([_, value]) => value !== null && value?.length > 0),
    );

    setFilters(updatedFilters as Record<string, string[]>);

    if (newFilters?.university?.length > 0) {
      setUniversityId(newFilters.university[0]);
    } else {
      setUniversityId(null);
    }

    if (sorter.field && sorter.order) {
      setSort({
        field: sorter.field,
        order: sorter.order,
      });
    } else if (!sorter.order) {
      setSort({ field: "created_at", order: "ascend" });
    }
  };

  const defaultCheckedList = columns.map((item) => item.key);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const newColumns = columns?.map((item) => ({
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
  const headerTableRender: TableProps<unknown>["title"] = () => (
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
            onSearch={handleSearch}
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
        <Table
          title={headerTableRender}
          className={`${styles.customTable}`}
          loading={{
            spinning: isFetching,
            tip: "Đang tải dữ liệu...",
          }}
          columns={newColumns}
          dataSource={dataResponses?.data?.data || []}
          bordered
          sticky={true}
          size="small"
          scroll={{ x: "max-content", y: 55 * 6 }}
          rowKey="id"
          pagination={pagination}
          onChange={handleTableChange}
        />
      </ConfigProvider>
    </div>
  );
};

export default FormResponseManagement;

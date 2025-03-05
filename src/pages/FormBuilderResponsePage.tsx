import { useQuery } from "@tanstack/react-query";
import { TableColumnsType, Tag } from "antd";
import { ColumnType, TablePaginationConfig } from "antd/es/table";
import { useParams } from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent";
import NotFoundComponent from "../components/NotFoundComponent";
import { PAGE_NAME } from "../constants/routerIndex";
import FormResponseManagement from "../features/form-response/FormResponseManagement";
import { useDynamicTitle, useScrollTop } from "../hooks";
import {
  FormBlockInstance,
  FormNotInputBlockTypes,
} from "../interfaces/form-block";
import { getFormById } from "../services";
import {
  colorFilterIcon,
  colorSortDownIcon,
  colorSortUpIcon,
  formatDate,
  formatDateTime,
} from "../utils/functionUtils";
import {
  CaretDownFilled,
  CaretUpFilled,
  FilterFilled,
} from "@ant-design/icons";
import { PER_PAGE } from "../constants/tableManagement";
import { useState } from "react";

const FormBuilderResponsePage: React.FC = () => {
  useDynamicTitle(PAGE_NAME.FORM_BUILDER_RESPONSE);
  useScrollTop();
  const params = useParams<{ form_id: string }>();
  const form_id = params.form_id;
  const { data, isFetching } = useQuery({
    queryKey: ["getFormById", form_id],
    queryFn: async () => getFormById(form_id || ""),
    enabled: !!form_id,
    refetchOnWindowFocus: false,
  });

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: PER_PAGE,
    total: 0,
    onShowSizeChange: (current, pageSize) => {
      setPagination({ ...pagination, current, pageSize });
    },
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20", "30"],
    showTotal(total, range) {
      return `${range[0]}-${range[1]} của ${total} phản hồi `;
    },
  });

  const columns: TableColumnsType<unknown> = data?.data
    ? [
        {
          title: "STT",
          dataIndex: "index",
          key: "index",
          render: (_, __, index) => {
            const currentPage = pagination.current || 1;
            const pageSize = pagination.pageSize || PER_PAGE;
            return (
              <span className="font-semibold">
                {(currentPage - 1) * pageSize + index + 1}
              </span>
            );
          },
          width: 50,
          align: "center",
          fixed: "left",
        },
        {
          title: "Họ tên",
          dataIndex: "name",
          key: "name",
          fixed: "left",
          width: 150,
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
          width: 150,
        },
        {
          title: "Số điện thoại",
          dataIndex: "phone_number",
          key: "phone_number",
          width: 120,
        },
        ...((data.data.scope === "SCHOLARSHIP" && [
          {
            title: "University",
            dataIndex: "university",
            key: "university",
            filterIcon: (filtered: boolean) => (
              <FilterFilled style={{ color: colorFilterIcon(filtered) }} />
            ),
            filters:
              data?.data.scope === "SCHOLARSHIP"
                ? data?.data?.universities?.map((uni) => ({
                    text: uni.name,
                    value: uni.id,
                  }))
                : undefined,
            filterMultiple: false,
            render: (value: string) => value || "-",
            width: 150,
          },
          {
            title: "Tổng điểm",
            dataIndex: "total_final_score",
            key: "total_final_score",
            sorter: true,

            render: (value: number) => value ?? "-",
            sortIcon: ({
              sortOrder,
            }: {
              sortOrder: "ascend" | "descend" | null;
            }) => (
              <div className="flex flex-col text-[10px]">
                <CaretUpFilled style={{ color: colorSortUpIcon(sortOrder) }} />
                <CaretDownFilled
                  style={{ color: colorSortDownIcon(sortOrder) }}
                />
              </div>
            ),
            width: 100,
          },
          {
            title: "Final Scores",
            dataIndex: "final_scores",
            key: "final_scores",
            width: 150,
            render: (value: Record<string, unknown>[]) =>
              value.length > 0 ? JSON.stringify(value) : "-",
          },
        ]) ||
          []),
        {
          title: "Trạng thái",
          dataIndex: "status",
          key: "status",
          width: 150,
          render: (value: string) => (
            <Tag color="green">{value || "SUBMITTED"}</Tag>
          ),
        },
        {
          title: "Ngày nộp",
          dataIndex: "created_at",
          key: "created_at",
          sortIcon: ({ sortOrder }) => (
            <div className="flex flex-col text-[10px]">
              <CaretUpFilled style={{ color: colorSortUpIcon(sortOrder) }} />
              <CaretDownFilled
                style={{ color: colorSortDownIcon(sortOrder) }}
              />
            </div>
          ),
          sorter: true,
          width: 150,
          render: (value: string) => formatDateTime(value),
        },
        ...(data.data.form_sections
          ?.flatMap((section) => section.json_blocks)
          ?.flatMap((block) => block.childBlock || [])
          ?.filter((block) => !FormNotInputBlockTypes.includes(block.blockType))
          ?.map((block: FormBlockInstance) => {
            const column: ColumnType<unknown> = {
              width: 200,
              title: block?.attributes?.label as string,
              dataIndex: block.id,
              key: block.id,
              render: (value: unknown) => {
                if (block.blockType === "InputNumber") {
                  return value ?? "-";
                } else if (
                  ["SelectOption", "RadioSelect", "CheckBox"].includes(
                    block.blockType,
                  )
                ) {
                  return Array.isArray(block?.attributes?.options)
                    ? (block.attributes.options.find(
                        (opt: string) => opt === value,
                      ) ?? "-")
                    : "-";
                } else if (block.blockType === "DatePicker") {
                  return formatDate(value as string);
                } else if (
                  block.blockType === "TimePicker" ||
                  block.blockType === "RangePicker"
                ) {
                  return value ? formatDateTime(value as string) : "-";
                } else if (block.blockType === "Signature") {
                  return value ? "Yes" : "No";
                } else if (block.blockType === "Uploader") {
                  return value ? "Yes" : "No";
                } else {
                  return value;
                }
              },
            };
            if (block.blockType === "InputNumber") {
              column.sorter = true;
              column.sortIcon = ({ sortOrder }) => (
                <div className="flex flex-col text-[10px]">
                  <CaretUpFilled
                    style={{ color: colorSortUpIcon(sortOrder) }}
                  />
                  <CaretDownFilled
                    style={{ color: colorSortDownIcon(sortOrder) }}
                  />
                </div>
              );
            } else if (
              ["SelectOption", "RadioSelect", "CheckBox"].includes(
                block.blockType,
              )
            ) {
              column.filters = Array.isArray(block?.attributes?.options)
                ? block.attributes.options.map((opt: string) => ({
                    text: opt,
                    value: opt,
                  }))
                : [];
              column.filterMultiple = block.blockType === "CheckBox";
              column.filterIcon = (filtered: boolean) => (
                <FilterFilled style={{ color: colorFilterIcon(filtered) }} />
              );
            }

            return column;
          }) || []),
        {
          title: "Hành động",
          key: "operation",
          fixed: "right",
          width: 150,
          render: () => <span>action</span>,
        },
      ]
    : [];

  if (isFetching) return <LoadingComponent />;
  return (
    <>
      {data?.data && columns && columns.length > 0 ? (
        <div className="flex min-h-[calc(100vh-70px)] w-full flex-grow flex-col bg-[#e3e8ec] p-2">
          <FormResponseManagement
            formResponse={data.data}
            columns={columns}
            pagination={pagination}
            setPagination={setPagination}
          />
        </div>
      ) : (
        <NotFoundComponent />
      )}
    </>
  );
};

export default FormBuilderResponsePage;

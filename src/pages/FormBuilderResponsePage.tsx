import {
  CaretDownFilled,
  CaretUpFilled,
  FilterFilled,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Space, TableColumnsType, Tag } from "antd";
import { ColumnType } from "antd/es/table";
import { useParams, useSearchParams } from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent";
import NotFoundComponent from "../components/NotFoundComponent";
import { PAGE_NAME } from "../constants/routerIndex";
import { PER_PAGE, STATUS_RESPONSE_FORM } from "../constants/tableManagement";
import FormResponseManagement from "../features/form-response/FormResponseManagement";
import { RenderResponseData } from "../features/form-response/RenderResponseData";
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
  colorStatusSubmit,
  formatDateTime,
} from "../utils/functionUtils";
import React from "react";
import ModalViewInforResponseForm from "../features/form-response/ModalViewInforResponseForm";
import ModalEditInforResponse from "../features/form-response/ModalEditInforResponse";

const FormBuilderResponsePage: React.FC = () => {
  useDynamicTitle(PAGE_NAME.FORM_BUILDER_RESPONSE);
  useScrollTop();
  const { form_id } = useParams<{ form_id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isFetching } = useQuery({
    queryKey: ["getFormById", form_id],
    queryFn: async () => getFormById(form_id || ""),
    enabled: !!form_id,
    refetchOnWindowFocus: false,
  });

  const columns: TableColumnsType<unknown> = data?.data
    ? [
        {
          title: "STT",
          dataIndex: "index",
          key: "index",
          render: (_, __, index) => {
            const currentPage = Number(searchParams.get("page")) || 1;
            const pageSize = Number(searchParams.get("pageSize")) || PER_PAGE;
            return (
              <span className="font-semibold">
                {(currentPage - 1) * pageSize + index + 1}
              </span>
            );
          },

          align: "center",
          fixed: "left",
        },
        {
          title: "Họ tên",
          dataIndex: "name",
          key: "name",
          fixed: "left",
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
        },
        {
          title: "Số điện thoại",
          dataIndex: "phone_number",
          key: "phone_number",
        },
        ...((data.data.scope === "SCHOLARSHIP" && [
          {
            title: "Trường học",
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
          },
          {
            title: "Điểm từng phần",
            dataIndex: "final_scores",
            key: "final_scores",

            render: (value: Record<string, unknown>[]) =>
              value.length > 0 ? JSON.stringify(value) : "-",
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
          },
        ]) ||
          []),
        {
          title: "Trạng thái",
          dataIndex: "status",
          key: "status",

          render: (value) => (
            <Tag color={colorStatusSubmit(value)}>{value}</Tag>
          ),
          filterIcon: (filtered: boolean) => (
            <FilterFilled style={{ color: colorFilterIcon(filtered) }} />
          ),
          filters: STATUS_RESPONSE_FORM.map((status) => ({
            text: status.label,
            value: status.value,
          })),
          filterMultiple: false,
        },
        {
          title: "Thời gian nộp",
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

          render: (value: string) => formatDateTime(value),
        },
        ...(data.data.form_sections
          ?.flatMap((section) => section.json_blocks)
          ?.flatMap((block) => block.childBlock || [])
          ?.filter((block) => !FormNotInputBlockTypes.includes(block.blockType))
          ?.map((block: FormBlockInstance) => {
            const column: ColumnType<unknown> = {
              title: block?.attributes?.label as string,
              dataIndex: block.id,
              key: block.id,
              render: (value: any) =>
                RenderResponseData(block.blockType, value),
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
          width: 150,
          key: "action",
          fixed: "right",
          align: "center",
          render: (_, record) => {
            return (
              <Space size={"middle"}>
                <ModalViewInforResponseForm
                  formResponse={data?.data}
                  record={record}
                />
                {/* <ModalEditInforResponse /> */}
              </Space>
            );
          },
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
            setSearchParams={setSearchParams}
          />
        </div>
      ) : (
        <NotFoundComponent />
      )}
    </>
  );
};

export default FormBuilderResponsePage;

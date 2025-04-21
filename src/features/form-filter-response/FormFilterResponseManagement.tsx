import {
  CaretDownFilled,
  CaretUpFilled,
  FilterFilled,
} from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, Space, Table, TableProps, Tag, Tooltip } from "antd";
import { Key, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import { useParams } from "react-router-dom";
import InputSearchComponent from "../../components/InputSearchComponent";
import { IDataFormFilterResponse } from "../../interfaces";
import { getAllUniversitiesService } from "../../services";
import {
  approveResponseService,
  getAllResponseToFilterByFormIdService,
} from "../../services/form-filter-response/form-filter-response-service";
import {
  colorFilterIcon,
  colorSortDownIcon,
  colorSortUpIcon,
  colorStatusSubmit,
  formatDateTime,
} from "../../utils/functionUtils";
import ModalViewInforResponseForm from "../form-response/ModalViewInforResponseForm";
import ModalRejectResponse from "./ModalRejectResponse";
const FormFilterResponseManagement: React.FC = () => {
  const { form_id } = useParams<{ form_id: string }>();
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>("");
  const queryClient = useQueryClient();
  const { data: dataUniversity } = useQuery({
    queryKey: ["universities"],
    queryFn: async () => getAllUniversitiesService(),
  });

  const { data: dataFormFilterResponse, isLoading } = useQuery({
    queryKey: ["form-filter-response", form_id],
    queryFn: async () =>
      getAllResponseToFilterByFormIdService(form_id as string),
    enabled: !!form_id,
  });
  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const mutationApproveResponse = useMutation({
    mutationFn: async (id: number) => {
      return await approveResponseService(id);
    },
    onSuccess: (data) => {
      if (data && data.data) {
        toast.success(data.message as string);
        queryClient.invalidateQueries({
          queryKey: ["form-filter-response"],
        });
        queryClient.invalidateQueries({
          queryKey: ["form-response-detail-reviewer"],
        });
      }
      if (data && data.error) {
        toast.error(data.message as string);
      }
    },
    onError: () => {
      toast.error("Có lỗi xảy ra vui lòng thử lại sau!");
    },
  });

  const columns: TableProps<IDataFormFilterResponse>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
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
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (value) => <Tag color={colorStatusSubmit(value)}>{value}</Tag>,
    },
    {
      title: "Trường học",
      dataIndex: "university",
      key: "university",
      filterIcon: (filtered: boolean) => (
        <FilterFilled style={{ color: colorFilterIcon(filtered) }} />
      ),
      onFilter: (value: boolean | Key, record) =>
        record.university?.name === value ||
        (!record.university?.name && value === "-"),
      filters: dataUniversity?.data!.map((item) => {
        return {
          text: item.name,
          value: item.name,
        };
      }),
      render: (_, record) => {
        return record?.university?.name || "-";
      },
    },
    {
      title: "Thời gian nộp",
      dataIndex: "created_at",
      key: "created_at",
      render: (value) => {
        return formatDateTime(value);
      },
      sorter: (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      sortIcon: ({ sortOrder }) => (
        <div className="flex flex-col text-[10px]">
          <CaretUpFilled style={{ color: colorSortUpIcon(sortOrder) }} />
          <CaretDownFilled style={{ color: colorSortDownIcon(sortOrder) }} />
        </div>
      ),
    },
    {
      title: "Thời gian cập nhật",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (value) => {
        return formatDateTime(value);
      },
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      width: 120,
      render: (_, record) => (
        <Space size="middle">
          <ModalViewInforResponseForm record={record.id.toString()} />
          <Tooltip title="Duyệt hồ sơ" placement="top">
            <FaCheck
              onClick={() => {
                mutationApproveResponse.mutate(record.id);
              }}
              className="cursor-pointer text-xl text-green-500 transition-all duration-200 hover:scale-110 hover:text-green-600"
            />
          </Tooltip>
          <ModalRejectResponse response={record} />
        </Space>
      ),
    },
  ];

  const filteredData = dataFormFilterResponse?.data?.filter((item) => {
    const searchLower = searchText.toLowerCase();
    const matchesSearch =
      item.name?.toLowerCase().includes(searchLower) ||
      item.email?.toLowerCase().includes(searchLower) ||
      item.phone_number?.toLowerCase().includes(searchLower);
    const matchesUniversity = dataUniversity?.data?.some((uni) => {
      return item.university?.name === uni.name;
    });

    return matchesSearch || matchesUniversity;
  });
  return (
    <div className="mx-auto flex min-h-[calc(100vh-90px)] w-full max-w-screen-xl flex-col space-y-3 rounded-md">
      <Card
        className="py-3"
        title={
          <div className="flex w-full items-center justify-between rounded-md bg-primary px-4 py-2 text-2xl font-semibold text-white">
            <div>Lọc hồ sơ</div>
          </div>
        }
      >
        <Space className="w-full justify-between">
          <InputSearchComponent
            onSearch={handleSearch}
            size="middle"
            allowClear
            placeholder="Tìm theo tên, email, số điện thoại"
            enterButton={<IoMdSearch className="text-xl" />}
            defaultValue={searchText}
          />
        </Space>
        <div className="mt-4">
          <Table
            rowKey="id"
            columns={columns}
            dataSource={filteredData}
            loading={{ spinning: isLoading, tip: "Đang tải dữ liệu..." }}
            size="small"
            pagination={{
              pageSize,
              showSizeChanger: true,
              pageSizeOptions: [5, 10, 20, 50],
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} của ${total} hồ sơ`,
              onShowSizeChange: (_, size) => {
                setPageSize(size);
              },
            }}
          />
        </div>
      </Card>
    </div>
  );
};

export default FormFilterResponseManagement;

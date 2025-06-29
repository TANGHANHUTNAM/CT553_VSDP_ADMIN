import { FilterFilled } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  ConfigProvider,
  Flex,
  Space,
  Table,
  TableColumnsType,
  Tag,
} from "antd";
import {
  FilterValue,
  TablePaginationConfig,
  TableRowSelection,
} from "antd/es/table/interface";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoMdClose, IoMdSearch } from "react-icons/io";
import AvatarComponent from "../../components/AvatarComponent";
import InputSearchComponent from "../../components/InputSearchComponent";
import {
  IDataFormResponseAssignmentWithReviewer,
  IFormResponseAssignmentWithReviewer,
  IReviewer,
} from "../../interfaces/form-assignment";
import { getAllUniversitiesService } from "../../services";
import {
  colorFilterIcon,
  colorStatusSubmit,
  formatDate,
} from "../../utils/functionUtils";
import ModalViewInforResponseForm from "../form-response/ModalViewInforResponseForm";
import ModalAssignmentApplication from "./ModalAssignmentApplication";
import ModalViewReviewer from "./ModalViewReviewer";
import ModalDeleteReviewerAssignment from "./ModalDeleteReviewerAssignment";

interface ISegmentApplicationsBySectionsScoreProps {
  data: IDataFormResponseAssignmentWithReviewer | undefined;
  isLoading: boolean;
  current: number;
  pageSize: number;
  setCurrent: (current: number) => void;
  setPageSize: (pageSize: number) => void;
  setSearchText: (searchText: string) => void;
  universityId: number | null;
  setUniversityId: (universityId: number | null) => void;
  sectionId: number | null;
  assigned?: boolean;
  setAssigned?: (assigned: boolean | undefined) => void;
}

const SegmentApplicationsBySectionsScore: React.FC<
  ISegmentApplicationsBySectionsScoreProps
> = ({
  data,
  isLoading,
  current,
  pageSize,
  setCurrent,
  setPageSize,
  setSearchText,
  universityId,
  setUniversityId,
  sectionId,
  assigned,
  setAssigned,
}) => {
  const { data: dataUniversity } = useQuery({
    queryKey: ["universities"],
    queryFn: async () => getAllUniversitiesService(),
    enabled: !!data,
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const columns: TableColumnsType<IFormResponseAssignmentWithReviewer> = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Họ tên", dataIndex: "name", key: "name", width: "13%" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Số điện thoại", dataIndex: "phone_number", key: "phone_number" },
    {
      title: "Trường",
      dataIndex: "university",
      key: "university",
      filteredValue: universityId ? [universityId] : null,
      filterSearch: true,
      filters: dataUniversity?.data?.map((university) => ({
        text: university.name,
        value: university.id,
      })),
      filterIcon: (filtered: boolean) => (
        <FilterFilled style={{ color: colorFilterIcon(filtered) }} />
      ),
      filterMultiple: false,
    },
    {
      align: "center",
      title: "Trạng thái hồ sơ",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={colorStatusSubmit(status)}>{status}</Tag>,
    },
    {
      align: "center",
      title: "Trạng thái phân công",
      filteredValue: assigned !== undefined ? [assigned] : null,
      dataIndex: "assignedReviewers",
      filterIcon: (filtered: boolean) => (
        <FilterFilled style={{ color: colorFilterIcon(filtered) }} />
      ),
      filterMultiple: false,
      filters: [
        {
          text: "Đã phân công",
          value: true,
        },
        {
          text: "Chưa phân công",
          value: false,
        },
      ],

      key: "assignedReviewers",
      render: (_, record: IFormResponseAssignmentWithReviewer) => (
        <div className="flex items-center justify-center">
          {record.assignedReviewers.length > 0 ? (
            <FaCheck className="text-xl text-green-500" />
          ) : (
            <IoMdClose className="text-xl text-red-500" />
          )}
        </div>
      ),
    },
    {
      title: "Ngày nộp",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at) => formatDate(created_at),
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      width: 120,
      align: "center",
      render: (_, record: IFormResponseAssignmentWithReviewer) => (
        <Space size="middle">
          <ModalViewInforResponseForm record={record.id.toString()} />
        </Space>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<IFormResponseAssignmentWithReviewer> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
  ) => {
    const { current: newCurrent, pageSize: newPageSize } = pagination;
    const universityFilter = filters.university
      ? Number(filters.university[0])
      : null;
    const assignedFilter =
      filters.assignedReviewers !== null
        ? filters.assignedReviewers?.[0] === true
        : undefined;
    if (newPageSize !== pageSize) {
      setPageSize(newPageSize as number);
      setCurrent(1);
    } else {
      setCurrent(newCurrent as number);
    }

    setUniversityId(universityFilter);
    if (setAssigned) {
      setAssigned(assignedFilter);
    }
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <Flex align="center" gap="middle">
          <Button
            type="primary"
            onClick={() => setSelectedRowKeys([])}
            disabled={!hasSelected}
          >
            Xóa lựa chọn
          </Button>

          <>
            <ModalAssignmentApplication
              applications={selectedRowKeys}
              sectionId={sectionId}
              setSelectedRowKeysReponse={setSelectedRowKeys}
            />
            {hasSelected && (
              <div className="text-sm font-semibold">
                {selectedRowKeys.length} hồ sơ đã chọn
              </div>
            )}
          </>
        </Flex>
        <InputSearchComponent
          onSearch={(value) => {
            setSearchText(value);
            setCurrent(1);
          }}
          size="middle"
          allowClear
          placeholder="Tìm kiếm..."
          className="mb-3 w-[300px]"
          enterButton={<IoMdSearch className="text-xl" />}
        />
      </div>
      <Table<IFormResponseAssignmentWithReviewer>
        size="middle"
        bordered
        rowSelection={rowSelection}
        loading={{ spinning: isLoading, tip: "Đang tải dữ liệu..." }}
        columns={columns}
        rowKey={(record) => record.id.toString()}
        dataSource={data?.responses ?? []}
        pagination={{
          current,
          pageSize,
          total: data?.total,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50", "100"],
          showTotal: (total) => `Tổng ${total} hồ sơ`,
        }}
        onChange={handleTableChange}
        expandable={{
          expandedRowRender: (recordResponse) => (
            <ConfigProvider
              theme={{
                components: {
                  Table: {
                    headerBorderRadius: 0,
                  },
                },
              }}
            >
              <div className="mt-2 flex w-full flex-col gap-2 rounded-md border border-gray-300 bg-gray-50 p-3">
                <div className="mb-2 text-sm font-semibold">Người đánh giá</div>
                <Table<IReviewer>
                  rowKey={(record) => record.id.toString()}
                  size="small"
                  pagination={false}
                  bordered
                  dataSource={recordResponse?.assignedReviewers || []}
                  columns={[
                    {
                      title: "Họ tên",
                      dataIndex: "name",
                      key: "name",
                      render: (_, record: IReviewer) => (
                        <Space size="middle">
                          <AvatarComponent src={record.avatar_url} size={30} />
                          <span className="text-sm">{record.name}</span>
                        </Space>
                      ),
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
                      title: "Vai trò",
                      dataIndex: "role",
                      key: "role",
                    },
                    {
                      width: 100,
                      title: "Hành động",
                      dataIndex: "action",
                      align: "center",
                      key: "action",
                      render: (_, record: IReviewer) => (
                        <Space size="middle">
                          <ModalViewReviewer reviewer_id={record.id} />
                          <ModalDeleteReviewerAssignment
                            name={record?.name}
                            reviewer_id={record?.id}
                            section_score_id={sectionId as number}
                            form_response_id={recordResponse.id as number}
                          />
                        </Space>
                      ),
                    },
                  ]}
                />
              </div>
            </ConfigProvider>
          ),
          rowExpandable: (record) => record.assignedReviewers.length !== 0,
        }}
      />
    </div>
  );
};

export default SegmentApplicationsBySectionsScore;

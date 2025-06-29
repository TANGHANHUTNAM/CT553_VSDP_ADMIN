import { FilterFilled } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Flex,
  Modal,
  Space,
  Table,
  TableColumnsType,
  Tooltip,
} from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdAssignmentAdd } from "react-icons/md";
import AvatarComponent from "../../components/AvatarComponent";
import { IReviewer } from "../../interfaces/form-assignment";
import {
  assignReviewerToFormResponseService,
  getAllReviersService,
  getAllRolesService,
} from "../../services";
import { colorFilterIcon } from "../../utils/functionUtils";

interface IModalAssignmentApplicationProps {
  applications: React.Key[];
  sectionId: number | null;
  setSelectedRowKeysReponse: (selectedRowKeys: React.Key[]) => void;
}

const ModalAssignmentApplication: React.FC<
  IModalAssignmentApplicationProps
> = ({ applications, sectionId, setSelectedRowKeysReponse }) => {
  const queryClient = useQueryClient();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const { data: dataReviewers, isLoading } = useQuery({
    queryKey: ["reviewers"],
    queryFn: () => getAllReviersService(),
    enabled: !!open,
  });
  const { data: dataRole } = useQuery({
    queryKey: ["roles-reviewer"],
    queryFn: () => getAllRolesService(),
    enabled: !!open,
  });

  const mutationAssignmentReviewers = useMutation({
    mutationFn: async (data: {
      form_response_ids: React.Key[];
      reviewer_ids: React.Key[];
      section_id: number | null;
    }) => {
      return await assignReviewerToFormResponseService(
        data.form_response_ids as number[],
        data.reviewer_ids as number[],
        data.section_id as number,
      );
    },
    onSuccess: (data) => {
      if (data && data.data) {
        toast.success(data.message as string);
        queryClient.invalidateQueries({
          queryKey: ["form-response-detail-reviewer"],
        });
        setSelectedRowKeys([]);
        setOpen(false);
        setSelectedRowKeysReponse([]);
      }
      if (data && data.error) {
        toast.error(data.message as string);
      }
    },
    onError: () => {
      toast.error("Có lỗi xảy ra trong quá trình phân công hồ sơ!");
    },
  });
  const columns: TableColumnsType<IReviewer> = [
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
      render: (_, record: IReviewer) => (
        <Space size="middle" className="flex items-center">
          <AvatarComponent alt={record?.name} src={record?.avatar_url} />
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
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      filterMultiple: false,
      filters: dataRole?.data?.map((item) => ({
        text: item.name,
        value: item.name,
      })),
      onFilter: (value, record) => {
        return record.role === value;
      },
      filterIcon: (filtered: boolean) => (
        <FilterFilled style={{ color: colorFilterIcon(filtered) }} />
      ),
    },
    {
      title: "Mô tả vai trò",
      dataIndex: "description",
      key: "description",
    },
  ];
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection: TableRowSelection<IReviewer> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const handleAssignment = () => {
    if (!sectionId) return;
    if (selectedRowKeys.length === 0) {
      toast.error("Vui lòng chọn người đánh giá để phân công hồ sơ!");
      return;
    }
    const form_response_ids = applications.map((id) => Number(id));
    const reviewer_ids = selectedRowKeys.map((id) => Number(id));
    mutationAssignmentReviewers.mutate({
      form_response_ids,
      reviewer_ids,
      section_id: sectionId,
    });
  };
  return (
    <>
      <Tooltip title="Phân công hồ sơ">
        <Button
          ghost
          disabled={applications.length === 0}
          type="primary"
          size="middle"
          onClick={() => setOpen(true)}
          icon={<MdAssignmentAdd />}
        >
          Phân công hồ sơ
        </Button>
      </Tooltip>
      <Modal
        width={1000}
        title="Chọn người đánh giá"
        open={open}
        onCancel={() => setOpen(false)}
        okText="Phân công"
        cancelText="Hủy"
        centered
        onOk={() => {
          handleAssignment();
        }}
        maskClosable={false}
        okButtonProps={{
          disabled: selectedRowKeys.length === 0,
          loading: mutationAssignmentReviewers.isPending,
        }}
      >
        <Flex align="center" gap="middle" className="mb-4">
          <Button
            type="primary"
            onClick={() => {
              setSelectedRowKeys([]);
            }}
            disabled={!selectedRowKeys?.length}
          >
            Xóa lựa chọn
          </Button>
          {selectedRowKeys?.length > 0
            ? `Đã chọn ${selectedRowKeys.length} người đánh giá`
            : null}
        </Flex>
        <Table<IReviewer>
          loading={isLoading}
          columns={columns}
          dataSource={dataReviewers?.data}
          rowSelection={rowSelection}
          pagination={false}
          rowKey={(record) => record.id.toString()}
        />
      </Modal>
    </>
  );
};

export default ModalAssignmentApplication;

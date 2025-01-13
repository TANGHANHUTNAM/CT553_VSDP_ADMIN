import { FilterFilled } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  ConfigProvider,
  Flex,
  Modal,
  Table,
  TableColumnsType,
  TableProps,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import { dataMethod, dataModule } from "../../constants/permissions";
import { IPermissionResponse, IRoleResponse } from "../../interfaces";
import {
  getAllPermissionsByRoleIdService,
  getAllPermissionsService,
} from "../../services/permission/permission-service";
import { colorFilterIcon, colorMethod } from "../../utils/functionUtils";
import { updateRolePermissionsService } from "../../services";
import toast from "react-hot-toast";

interface IModalUpdateListPermissionsRoleProps {
  setOpen: (open: boolean) => void;
  open: boolean;
  dataDetailRole: IRoleResponse | null;
}

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

const columns: TableColumnsType<IPermissionResponse> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 50,
    align: "center",
  },
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Module",
    dataIndex: "module",
    key: "module",
    filters: dataModule,
    filterIcon: (filtered) => (
      <FilterFilled style={{ color: colorFilterIcon(filtered) }} />
    ),
    onFilter: (value, record) => record.module.indexOf(value as string) === 0,
  },
  {
    title: "Method",
    dataIndex: "method",
    key: "method",
    filters: dataMethod,
    filterIcon: (filtered) => (
      <FilterFilled style={{ color: colorFilterIcon(filtered) }} />
    ),
    onFilter: (value, record) => record.method.indexOf(value as string) === 0,
    render: (text) => <Tag color={colorMethod(text)}>{text}</Tag>,
  },
  {
    title: "API Path",
    dataIndex: "api_path",
    key: "api_path",
  },
];

const ModalUpdateListPermissionsRole: React.FC<
  IModalUpdateListPermissionsRoleProps
> = ({ setOpen, open, dataDetailRole }) => {
  const queryClient = useQueryClient();

  const { data: dataDetailRolePermissions } = useQuery({
    queryKey: ["allPermissionsByRoleId", dataDetailRole?.id],
    queryFn: () => getAllPermissionsByRoleIdService(dataDetailRole?.id ?? 0),
    enabled: open && (dataDetailRole?.id as number) > 0,
  });

  const { data: dataPermissions } = useQuery({
    queryKey: ["allPermissions"],
    queryFn: () => getAllPermissionsService(),
    enabled: open,
  });

  useEffect(() => {
    if (dataDetailRolePermissions?.data || open) {
      setSelectedRowKeys(
        dataDetailRolePermissions?.data
          ?.map((item) => item.id)
          .filter((id): id is number => id !== undefined) ?? [],
      );
    }
  }, [dataDetailRolePermissions, dataPermissions, open]);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 500);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<IPermissionResponse> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const mutationUpdateListPermissionsRole = useMutation({
    mutationFn: async () => {
      const res = await updateRolePermissionsService(
        dataDetailRole?.id as number,
        selectedRowKeys as number[],
      );
      return res;
    },
    onSuccess: (data) => {
      if (data && data.data) {
        queryClient.invalidateQueries({
          queryKey: ["allPermissionsByRoleId"],
        });
        toast.success(data.message as string);
        setOpen(false);
      }
      if (data && data.error) {
        toast.error(data.message as string);
      }
    },
    onError: () => {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    },
  });
  useEffect(() => {}, [selectedRowKeys]);
  return (
    <>
      <Modal
        title={`Cập nhật danh sách quyền cho vai trò ${dataDetailRole?.name ?? ""}`}
        okText="Cập nhật"
        open={open}
        okButtonProps={{ loading: mutationUpdateListPermissionsRole.isPending }}
        onCancel={() => setOpen(false)}
        onOk={() => mutationUpdateListPermissionsRole.mutate()}
        style={{ minWidth: "80%", top: 20 }}
        maskClosable={false}
        afterClose={() => {
          setSelectedRowKeys([]);
        }}
      >
        <Flex gap="middle" vertical>
          <Flex align="center" gap="middle">
            <Button
              type="primary"
              onClick={start}
              disabled={!hasSelected}
              loading={loading}
            >
              Reset
            </Button>
            {hasSelected ? `Đã cấp ${selectedRowKeys.length} quyền hạn` : null}
          </Flex>
          <ConfigProvider
            componentSize="small"
            theme={{
              components: {
                Table: {
                  headerBorderRadius: 0,
                },
              },
            }}
          >
            <Table<IPermissionResponse>
              rowSelection={rowSelection}
              columns={columns}
              dataSource={dataPermissions?.data ?? []}
              loading={mutationUpdateListPermissionsRole.isPending}
              rowKey={(record) => record.id as number}
              pagination={{
                total: dataPermissions?.data?.length ?? 0,
                showSizeChanger: true,
                showTotal(total) {
                  return `Tổng ${total} quyền hạn`;
                },
                pageSizeOptions: ["5", "10", "20", "50", "100", "500"],
              }}
            />
          </ConfigProvider>
        </Flex>
      </Modal>
    </>
  );
};

export default ModalUpdateListPermissionsRole;

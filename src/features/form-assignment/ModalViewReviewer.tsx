import { useQuery } from "@tanstack/react-query";
import { Descriptions, Drawer } from "antd";
import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import ViewComponent from "../../components/ViewComponent";
import { viewDetailsReviewerService } from "../../services";

import AvatarComponent from "../../components/AvatarComponent";
import { formatDate } from "../../utils/functionUtils";

interface IModalViewReviewerProps {
  reviewer_id: number | null;
}

const ModalViewReviewer: React.FC<IModalViewReviewerProps> = ({
  reviewer_id,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading } = useQuery({
    queryKey: ["reviewer", reviewer_id],
    queryFn: () => viewDetailsReviewerService(reviewer_id as number),
    enabled: !!reviewer_id && !!open,
  });

  return (
    <>
      <ViewComponent
        titleTooltip="Xem chi tiết người đánh giá"
        onClick={() => {
          setOpen(true);
        }}
      />

      <Drawer
        loading={isLoading}
        closable
        closeIcon={<FaWindowClose className="text-2xl text-primary" />}
        size="large"
        destroyOnClose
        title={
          <div className="">{`Chi tiết người đánh giá ${data?.data?.name} `}</div>
        }
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Avatar">
            <AvatarComponent
              src={data?.data?.avatar_url || undefined}
              size={40}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Họ và tên">
            {data?.data?.name || "—"}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {data?.data?.email || "—"}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {data?.data?.phone_number || "—"}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày sinh">
            {formatDate(data?.data?.date_of_birth as string)}
          </Descriptions.Item>
          <Descriptions.Item label="Giới tính">
            {data?.data?.gender || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Trường học">
            {data?.data?.school || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Chuyên ngành">
            {data?.data?.major || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Công ty">
            {data?.data?.company || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Chức vụ">
            {data?.data?.job_title || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Thế hệ">
            {data?.data?.generation || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Vai trò">
            {data?.data?.role?.name || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Mô tả vai trò">
            {data?.data?.role?.description || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Khách mời bên ngoài">
            {data?.data?.is_external_guest ? "Có" : "Không"}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày bắt đầu">
            {formatDate(data?.data?.start_date as string)}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày kết thúc">
            {formatDate(data?.data?.end_date as string)}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày tạo tài khoản">
            {formatDate(data?.data?.created_at as string)}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày tạo vai trò">
            {formatDate(data?.data?.role?.created_at as string)}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};

export default ModalViewReviewer;

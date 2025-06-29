import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import { useDynamicTitle, useScrollTop } from "../hooks";
import { PAGE_NAME } from "../constants/routerIndex";

const NotPermissionPage: React.FC = () => {
  useDynamicTitle(PAGE_NAME.NOT_PERMISSION);
  useScrollTop();

  return (
    <div className="flex min-h-screen items-center justify-center dark:bg-dark-900">
      <Result
        status="403"
        title="403"
        subTitle="Xin lỗi, bạn không có quyền hạn truy cập thông tin này"
        extra={
          <Link to="/" type="primary">
            <Button type="primary">Về trang chủ</Button>
          </Link>
        }
      />
    </div>
  );
};

export default NotPermissionPage;

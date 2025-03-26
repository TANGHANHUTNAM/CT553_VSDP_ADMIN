import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import { useAppSelector, useDynamicTitle, useScrollTop } from "../hooks";
import { useEffect } from "react";
import { PAGE_NAME } from "../constants/routerIndex";

const NotFoundPage: React.FC = () => {
  useDynamicTitle(PAGE_NAME.NOT_FOUND);
  useScrollTop();
  const { isDarkMode } = useAppSelector((state) => state.app);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  return (
    <div className="flex min-h-screen items-center justify-center dark:bg-dark-900">
      <Result
        status="404"
        title="404 Lỗi! Không tìm thấy nội dung yêu cầu."
        subTitle="Xin lỗi, trang bạn đang tìm kiếm không tồn tại."
        extra={
          <Link to="/" type="primary">
            <Button type="primary">Về trang chủ</Button>
          </Link>
        }
      />
    </div>
  );
};

export default NotFoundPage;

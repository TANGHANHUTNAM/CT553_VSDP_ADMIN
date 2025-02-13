import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import { ROUTER_URL } from "../constants/routerIndex";

const NotFoundComponent = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Không tìm thấy nội dung bạn yêu cầu."
      extra={
        <Link to={ROUTER_URL.FORM_PAGE}>
          <Button type="primary">Trở lại</Button>
        </Link>
      }
    />
  );
};

export default NotFoundComponent;

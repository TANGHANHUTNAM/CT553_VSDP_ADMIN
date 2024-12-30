import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import { useDynamicTitle, useScrollTop } from "../hooks";

const NotFoundPage: React.FC = () => {
  useDynamicTitle("404 Not Found");
  useScrollTop();
  return (
    <div className="dark:bg-dark-900 flex min-h-screen items-center justify-center">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to="/" type="primary">
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    </div>
  );
};

export default NotFoundPage;

import { Spin } from "antd";

const LoadingComponent: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <Spin size="large" />
    </div>
  );
};

export default LoadingComponent;

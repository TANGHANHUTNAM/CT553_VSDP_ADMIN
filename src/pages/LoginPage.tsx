import { useDynamicTitle, useScrollTop } from "../hooks";

interface ILoginPageProps {}

const LoginPage: React.FC<ILoginPageProps> = ({}) => {
  useDynamicTitle("Đăng nhập");
  useScrollTop();
  return <>Login</>;
};

export default LoginPage;

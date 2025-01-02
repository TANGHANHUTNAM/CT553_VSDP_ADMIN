import { useEffect } from "react";
import vsdp from "../assets/vsdp.jpg";
import LoginForm from "../features/auth/LoginForm";
import LoginGoogle from "../features/auth/LoginGoogle";
import { useAppSelector, useDynamicTitle, useScrollTop } from "../hooks";
import { PAGE_NAME } from "../constants/routerIndex";

const LoginPage: React.FC = () => {
  useDynamicTitle(PAGE_NAME.LOGIN);
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
    <div className="flex min-h-screen items-center justify-center bg-blue-50 dark:bg-dark-900">
      <div className="flex justify-center">
        {/* form */}
        <div className="flex min-h-full flex-col items-center justify-center gap-5 rounded-l-lg bg-white p-8 shadow-lg dark:bg-dark-700">
          <div className="dark:text-text_primary text-xl font-semibold uppercase">
            Đăng nhập
          </div>
          <LoginForm />
          <LoginGoogle />
        </div>

        {/* img */}
        <div className="img hidden h-[500px] w-[500px] shadow-lg md:block">
          <img src={vsdp} alt="Login image" className="w-full rounded-r-lg" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

import { HashLoader } from "react-spinners";
import { GLOBAL_COLOR } from "../constants/colorCustom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTER_URL } from "../constants/routerIndex";
import { useAppSelector } from "../hooks";

const LoadingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuth } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuth) {
      navigate(ROUTER_URL.LOGIN_PAGE);
    }
  }, [isAuth, navigate]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3 text-xl sm:text-3xl lg:text-4xl">
      <HashLoader color={GLOBAL_COLOR} speedMultiplier={1} />
    </div>
  );
};

export default LoadingPage;

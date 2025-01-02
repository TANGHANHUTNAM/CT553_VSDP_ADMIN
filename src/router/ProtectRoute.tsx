import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useNavigate } from "react-router-dom";
import { ROUTER_URL } from "../constants/routerIndex";
import { IUserResponse, IResponse } from "../interfaces";
import { getAccountService } from "../services/user/user-service";
import { clearUser, setUser } from "../redux/userReducer";
import LoadingPage from "../pages/LoadingPage";
import { logout } from "../redux/authReducer";
import toast from "react-hot-toast";

interface IProtectRouteProps {
  children: React.ReactNode;
}

const ProtectRoute: React.FC<IProtectRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!isAuth && !window.localStorage.getItem("access_token")) {
      navigate(ROUTER_URL.LOGIN_PAGE);
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    const handleGetAccount = async () => {
      try {
        const res: IResponse<IUserResponse> = await getAccountService();
        if (res && res.data) {
          dispatch(setUser(res.data.user));
        }

        if (res && res.error) {
          dispatch(logout());
          dispatch(clearUser());
          toast.error(res.message as string);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (isAuth && window.localStorage.getItem("access_token") && !user) {
      handleGetAccount();
    }
  }, [isAuth, dispatch, user]);

  return <>{user ? <>{children}</> : <LoadingPage />}</>;
};

export default ProtectRoute;

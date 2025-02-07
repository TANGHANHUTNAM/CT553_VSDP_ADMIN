import { Link, NavLink } from "react-router-dom";
import vsdp from "../../assets/logo.png";
import AvatarComponent from "../AvatarComponent";
import { ROUTER_URL } from "../../constants/routerIndex";
import { useAppSelector } from "../../hooks";

const HeaderFormBuilder: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  return (
    <div className="bg-primary-500 sticky top-0 z-50 border-b-2 border-gray-300 bg-white">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between py-2.5">
        <Link to={ROUTER_URL.DASHBOARD_PAGE} className="flex items-center">
          <img src={vsdp} alt="Logo" className="mr-2 h-12" />
          <span className="text-xl font-semibold text-primary">
            FormBuilder
          </span>
        </Link>
        <div className="flex items-center space-x-4 text-gray-700">
          <NavLink
            to={ROUTER_URL.DASHBOARD_PAGE}
            className="hover:text-primary"
          >
            Trở về trang quản trị
          </NavLink>
          <NavLink to={""} className="hover:text-primary">
            Bảng điều khiển
          </NavLink>
          <NavLink to={""} className="hover:text-primary">
            Cài đặt
          </NavLink>
          <NavLink to={""} className="hover:text-primary">
            Downloads
          </NavLink>
          <div className="flex items-center justify-center space-x-1.5 font-semibold">
            <div>{user?.name || "Người dùng"}</div>
            <AvatarComponent src={user?.avatar_url} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderFormBuilder;

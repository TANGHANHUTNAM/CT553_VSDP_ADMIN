import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  Tooltip,
} from "antd";
import { Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { FaUser, FaUserCircle, FaUsers } from "react-icons/fa";
import { GrShieldSecurity } from "react-icons/gr";
import { IoMdSettings } from "react-icons/io";
import { IoKey } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import logo from "../assets/logo.png";
import BreadCrumbComponent from "../components/BreadCrumbComponent";
import { ALL_PERMISSIONS } from "../constants/permissions";
import { ROUTER_URL } from "../constants/routerIndex";
import LightDarkMode from "../features/app/LightDarkMode";
import { useAppDispatch, useAppSelector } from "../hooks";
import { IAuthLogoutResponse, IResponse } from "../interfaces";
import { IPermissionResponse } from "../interfaces/permission";
import { logout } from "../redux/authReducer";
import { clearUser } from "../redux/userReducer";
import { routerCustom } from "../router";
import { logoutService } from "../services";

const LayoutAdmin: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const { user } = useAppSelector((state) => state.user);
  const permissions = useAppSelector((state) => state.user.user?.permissions);
  const [menuItems, setMenuItems] = useState<MenuProps["items"]>([]);

  useEffect(() => {
    const ACL_ENABLE = import.meta.env.VITE_ACL_ENABLE;
    if ((permissions && permissions.length > 0) || ACL_ENABLE === "true") {
      // Hệ thống phân quyền
      const viewUser = permissions?.find(
        (item: IPermissionResponse) =>
          item.api_path === ALL_PERMISSIONS.USER.VIEW.api_path &&
          item.method === ALL_PERMISSIONS.USER.VIEW.method,
      );
      const viewRole = permissions?.find(
        (item: IPermissionResponse) =>
          item.api_path === ALL_PERMISSIONS.ROLE.VIEW.api_path &&
          item.method === ALL_PERMISSIONS.ROLE.VIEW.method,
      );
      const viewPermission = permissions?.find(
        (item: IPermissionResponse) =>
          item.api_path === ALL_PERMISSIONS.PERMISSION.VIEW.api_path &&
          item.method === ALL_PERMISSIONS.PERMISSION.VIEW.method,
      );
      const hasAuthChildren: boolean = Boolean(
        viewUser || viewRole || viewPermission,
      );
      // Hệ thống quản lý form

      const menu_full = [
        {
          label: <NavLink to={ROUTER_URL.DASHBOARD_PAGE}>Dashboard</NavLink>,
          key: ROUTER_URL.DASHBOARD_PAGE,
          icon: <MdDashboard />,
        },
        ...(hasAuthChildren || ACL_ENABLE === "true"
          ? [
              {
                label: "Quản lý phân quyền",
                key: "auth",
                icon: <GrShieldSecurity />,
                children: [
                  ...(viewUser || ACL_ENABLE === "true"
                    ? [
                        {
                          label: (
                            <NavLink to={ROUTER_URL.USER_PAGE}>
                              Người dùng
                            </NavLink>
                          ),
                          key: ROUTER_URL.USER_PAGE,
                          icon: <FaUsers />,
                        },
                      ]
                    : []),
                  ...(viewRole || ACL_ENABLE === "true"
                    ? [
                        {
                          label: (
                            <NavLink to={ROUTER_URL.ROLE_PAGE}>Vai trò</NavLink>
                          ),
                          key: ROUTER_URL.ROLE_PAGE,
                          icon: <RiUserSettingsLine />,
                        },
                      ]
                    : []),
                  ...(viewPermission || ACL_ENABLE === "true"
                    ? [
                        {
                          label: (
                            <NavLink to={ROUTER_URL.PERMISSION_PAGE}>
                              Quyền hạn
                            </NavLink>
                          ),
                          key: ROUTER_URL.PERMISSION_PAGE,
                          icon: <IoKey />,
                        },
                      ]
                    : []),
                ],
              },
            ]
          : []),
      ];

      setMenuItems(menu_full);
    }
  }, [permissions]);

  const siderStyle: React.CSSProperties = {
    overflow: "auto",
    height: "100vh",
    position: "fixed",
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: "thin",
    scrollbarColor: "light",
  };

  const headerStyle: React.CSSProperties = {
    padding: 0,
    zIndex: 1,
    overflow: "auto",
    position: "fixed",
    insetInlineStart: collapsed ? 80 : 230,
    top: 0,
    right: 0,
  };

  const items: MenuProps["items"] = [
    {
      key: "/infor",
      label: (
        <Tooltip title={`${user?.role?.description}`}>
          <NavLink
            to={ROUTER_URL.PROFILE_PAGE}
            className="flex items-center gap-3 text-black"
          >
            <Avatar size={34} src={user?.avatar || undefined} />
            <span className="flex w-20 flex-col justify-start gap-1">
              <p className="overflow-hidden text-ellipsis text-sm">
                {user?.email || "username@g.commmm"}
              </p>
              <p className="overflow-hidden truncate text-ellipsis text-xs uppercase">
                {user?.role?.name || "rolesad sadádasdsadas"}
              </p>
            </span>
          </NavLink>
        </Tooltip>
      ),
    },
    {
      type: "divider",
    },
    {
      key: ROUTER_URL.PROFILE_PAGE,
      label: <NavLink to={ROUTER_URL.PROFILE_PAGE}>Hồ sơ</NavLink>,
      icon: <FaUser className="" />,
    },
    {
      key: ROUTER_URL.SETTING_PAGE,
      label: <NavLink to={ROUTER_URL.SETTING_PAGE}>Cài đặt</NavLink>,
      icon: <IoMdSettings className="" />,
    },
    {
      key: "/logout",
      label: (
        <span
          onClick={() => {
            handleLogout();
          }}
          className=""
        >
          Đăng xuất
        </span>
      ),
      icon: <TbLogout2 className="" />,
    },
  ];

  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      const res: IResponse<IAuthLogoutResponse> = await logoutService();
      if (res && res.data) {
        dispatch(logout());
        dispatch(clearUser());
        toast.success("Đăng xuất thành công!");
        navigate(ROUTER_URL.LOGIN_PAGE);
      }
      if (res && res.error) {
        toast.error("Đăng xuất thất bại!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout className="min-h-screen">
      <Sider
        style={siderStyle}
        className="shadow-sm"
        width={230}
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
      >
        <Link
          to={ROUTER_URL.DASHBOARD_PAGE}
          className="flex flex-col items-center"
        >
          <img src={logo} alt="logo" className="w-28 p-2 pt-4" />
        </Link>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={selectedKeys}
          items={menuItems}
          style={{ borderRight: "none" }}
        />
      </Sider>
      <Layout
        className="transition-all duration-200"
        style={{ marginInlineStart: collapsed ? 80 : 230 }}
      >
        <Header
          style={headerStyle}
          className="shadow-sm transition-all duration-200"
        >
          <div className="flex min-h-full items-center justify-between">
            {/* Collapse */}
            <Tooltip title={collapsed ? "Mở rộng" : "Thu gọn"}>
              <Button
                type="text"
                icon={
                  collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />
                }
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "20px",
                  marginInlineStart: "10px",
                }}
              />
            </Tooltip>
            {/* Right */}
            <div className="relative mr-5 flex items-center justify-center gap-3">
              {/* Light Dark Mode */}
              <LightDarkMode />
              {/* Menu  */}
              <Dropdown
                menu={{
                  items,
                  selectedKeys: selectedKeys,
                  className: "absolute -top-3.5 cursor-pointer",
                }}
                overlayStyle={{}}
              >
                <div className="flex items-center gap-2">
                  <div className="flex font-medium">
                    {user?.name || "Họ tên"}
                  </div>
                  <Button
                    type="text"
                    icon={<FaUserCircle />}
                    style={{
                      fontSize: "30px",
                    }}
                  />
                </div>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Layout.Content className="bg-[#F5F5F5] p-3 dark:bg-transparent">
          <div className="mt-[64px] overflow-auto">
            <BreadCrumbComponent routes={routerCustom} />
            <Outlet />
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;

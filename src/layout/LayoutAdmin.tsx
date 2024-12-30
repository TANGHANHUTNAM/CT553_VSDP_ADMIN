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
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaCity, FaUser, FaUserAlt, FaUserCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { TbLogout2, TbReportSearch } from "react-icons/tb";
import { MdDashboard, MdPersonSearch, MdWork } from "react-icons/md";
import { IoBusiness } from "react-icons/io5";
import { FaEarthAsia, FaLocationDot, FaTreeCity } from "react-icons/fa6";
import LightDarkMode from "../features/app/LightDarkMode";
import { routerURL } from "../constants/routerIndex";

const LayoutAdmin: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location.pathname]);
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
        <div className="flex items-center gap-3 text-black">
          <Avatar size={34} src={undefined} />
          <span className="flex flex-col justify-start gap-1 text-sm">
            <p className="">{`ADMINsssss`}</p>
            <p className="text-xs">role</p>
          </span>
        </div>
      ),
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: routerURL.PROFILE_PAGE,
      label: <NavLink to={routerURL.PROFILE_PAGE}>Hồ sơ</NavLink>,
      icon: <FaUser className="" />,
    },
    {
      key: routerURL.SETTING_PAGE,
      label: <NavLink to={routerURL.SETTING_PAGE}>Cài đặt</NavLink>,
      icon: <IoMdSettings className="" />,
    },
    {
      key: "/logout",
      label: (
        <span onClick={() => {}} className="">
          Đăng xuất
        </span>
      ),
      icon: <TbLogout2 className="" />,
    },
  ];

  const menuItems: MenuProps["items"] = [
    {
      label: <NavLink to={routerURL.DASHBOARD_PAGE}>Dashboard</NavLink>,
      key: routerURL.DASHBOARD_PAGE,
      icon: <MdDashboard />,
    },
    {
      label: <NavLink to="/report-management">Báo cáo</NavLink>,
      key: "bao-cao",
      icon: <TbReportSearch />,
    },
    {
      label: "Quản lý người dùng",
      key: "quan-ly-nguoi-dung",
      icon: <FaUserAlt />,
      children: [
        {
          label: (
            <NavLink to="/job-seeker-management">Tài khoản người dùng</NavLink>
          ),
          key: "/job-seeker-management",
        },
      ],
    },
    {
      label: "Quản lý đăng tuyển",
      key: "quan-ly-dang-tuyen",
      icon: <MdPersonSearch />,
      children: [
        {
          label: (
            <NavLink to="/job-posting-management">Công việc đăng tuyển</NavLink>
          ),
          key: "/job-posting-management",
        },
      ],
    },
    {
      label: "Quản lý công ty",
      key: "quan-ly-cong-ty",
      icon: <IoBusiness />,
      children: [
        {
          label: <NavLink to="/company-management">Công ty</NavLink>,
          key: "/company-management",
        },
        {
          label: (
            <NavLink to="/company-type-management">Loại hình công ty</NavLink>
          ),
          key: "/company-type-management",
        },
        {
          label: (
            <NavLink to="/company-size-management">Quy mô công ty</NavLink>
          ),
          key: "/company-size-management",
        },
        {
          label: <NavLink to="/workplace-management">Nơi làm việc</NavLink>,
          key: "/workplace-management",
        },
      ],
    },
    {
      label: "Quản lý tuyển dụng",
      key: "quan-ly-tuyen-dung",
      icon: <MdWork />,
      children: [
        {
          label: <NavLink to="/language-management">Ngôn ngữ</NavLink>,
          key: "/language-management",
        },
        {
          label: <NavLink to="/job-categories-management">Nghề nghiệp</NavLink>,
          key: "/job-categories-management",
        },
        {
          label: (
            <NavLink to="/employment-type-management">
              Hình thức làm việc
            </NavLink>
          ),
          key: "/employment-type-management",
        },
        {
          label: (
            <NavLink to="/education-level-management">Trình độ học vấn</NavLink>
          ),
          key: "/education-level-management",
        },
        {
          label: (
            <NavLink to="/desired-job-level-management">
              Cấp bậc mong muốn
            </NavLink>
          ),
          key: "/desired-job-level-management",
        },
        {
          label: (
            <NavLink to="/experience-level-management">
              Số năm kinh nghiệm
            </NavLink>
          ),
          key: "/experience-level-management",
        },
      ],
    },
    {
      label: "Quản lý địa điểm",
      key: "quan-ly-dia-diem",
      icon: <FaLocationDot />,
      children: [
        {
          label: <NavLink to="/country-management">Quốc gia</NavLink>,
          key: "/country-management",
          icon: <FaEarthAsia />,
        },
        {
          label: <NavLink to="/city-management">Thành phố</NavLink>,
          key: "/city-management",
          icon: <FaCity />,
        },
        {
          label: <NavLink to="/district-management">Quận, huyện</NavLink>,
          key: "/district-management",
          icon: <FaTreeCity />,
        },
      ],
    },
  ];
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
        <div className="flex flex-col items-center">
          <img src={logo} alt="logo" className="w-28 p-2 pt-4" />
          {/* {!collapsed && (
            <h1 style={{ color: GLOBAL_COLOR }} className="text-lg font-medium">
              VSDP ADMIN
            </h1>
          )} */}
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={selectedKeys}
          items={menuItems}
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
                  <p className="font-medium uppercase">ADMIN</p>
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
        <Layout.Content>
          <div className="m-2.5 mt-[73px] overflow-auto">
            <Outlet />
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;

import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import vsdp from "../../assets/logo.png";
import { PAGE_NAME, ROUTER_URL } from "../../constants/routerIndex";
import { useAppSelector } from "../../hooks";
import { IFormResponse } from "../../interfaces";
import AvatarComponent from "../AvatarComponent";

interface HeaderFormBuilderProps {
  formData: IFormResponse;
}

const HeaderFormBuilder: React.FC<HeaderFormBuilderProps> = ({ formData }) => {
  const user = useAppSelector((state) => state.user.user);
  const param = useParams();
  const form_id = param["form_id"];
  const location = useLocation();

  const items: MenuProps["items"] = [
    {
      key: ROUTER_URL.FORM_BUILDER_SCORING_SECTION_SCHOLARSHIP_PAGE,
      label: (
        <NavLink
          to={ROUTER_URL.FORM_BUILDER_SCORING_SECTION_SCHOLARSHIP_PAGE}
          className={({ isActive }) =>
            isActive ? "text-primary" : "text-gray-700 hover:text-primary"
          }
        >
          {PAGE_NAME.FORM_BUILDER_SCORING_SECTION_SCHOLARSHIP}
        </NavLink>
      ),
    },
    {
      key: ROUTER_URL.FORM_BUILDER_FILTER_RESPONSE_PAGE,
      label: (
        <NavLink
          to={ROUTER_URL.FORM_BUILDER_FILTER_RESPONSE_PAGE}
          className={({ isActive }) =>
            isActive ? "text-primary" : "text-gray-700 hover:text-primary"
          }
        >
          {PAGE_NAME.FORM_BUILDER_FILTER_RESPONSE}
        </NavLink>
      ),
    },
    {
      key: ROUTER_URL.FORM_BUILDER_ASSIGEMENT_SCHOLARSHIP_PAGE,
      label: (
        <NavLink
          to={ROUTER_URL.FORM_BUILDER_ASSIGEMENT_SCHOLARSHIP_PAGE}
          className={({ isActive }) =>
            isActive ? "text-primary" : "text-gray-700 hover:text-primary"
          }
        >
          {PAGE_NAME.FORM_BUILDER_ASSIGEMENT_SCHOLARSHIP}
        </NavLink>
      ),
    },
    {
      key: ROUTER_URL.FORM_BUILDER_SCORING_RESPONSE_PAGE,
      label: (
        <NavLink
          to={ROUTER_URL.FORM_BUILDER_SCORING_RESPONSE_PAGE}
          className={({ isActive }) =>
            isActive ? "text-primary" : "text-gray-700 hover:text-primary"
          }
        >
          {PAGE_NAME.FORM_BUILDER_SCORING_RESPONSE}
        </NavLink>
      ),
    },
  ];

  const getSelectedKey = () => {
    const currentPath = location.pathname;
    const matchedItem = items.find((item) =>
      currentPath.includes(item?.key?.toString().split("/").pop() || ""),
    );
    return matchedItem ? [matchedItem.key?.toString()] : [];
  };

  const isDropdownActive = items.some((item) =>
    location.pathname.includes(item?.key?.toString() || ""),
  );

  return (
    <div className="bg-primary-500 sticky top-0 z-50 border-b-2 border-gray-300 bg-white">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between py-2.5">
        <Link to={ROUTER_URL.DASHBOARD_PAGE} className="flex items-center">
          <img src={vsdp} alt="Logo" className="mr-2 h-12" />
          <span
            className="w-[300px] truncate text-lg font-semibold text-primary"
            title={formData?.name}
          >
            {formData?.name || "Tên form"}
          </span>
        </Link>

        <div className="flex items-center space-x-4 font-medium text-gray-700">
          <NavLink
            to={ROUTER_URL.FORM_BUILDER_PAGE(form_id || "")}
            end
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-gray-700 hover:text-primary"
            }
          >
            {PAGE_NAME.FORM_BUILDER}
          </NavLink>
          <NavLink
            to={ROUTER_URL.FORM_BUILDER_PREVIEW_PAGE}
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-gray-700 hover:text-primary"
            }
          >
            {PAGE_NAME.FORM_BUILDER_PREVIEW}
          </NavLink>
          <NavLink
            to={ROUTER_URL.FORM_BUILDER_RESPONSE_PAGE}
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-gray-700 hover:text-primary"
            }
          >
            {PAGE_NAME.FORM_BUILDER_RESPONSE}
          </NavLink>
          <NavLink
            to={ROUTER_URL.FORM_BUILDER_STATISTICS_PAGE}
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-gray-700 hover:text-primary"
            }
          >
            {PAGE_NAME.FORM_BUILDER_STATISTICS}
          </NavLink>
          <NavLink
            to={ROUTER_URL.FORM_BUILDER_MAIL_HISTORY_PAGE}
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-gray-700 hover:text-primary"
            }
          >
            {PAGE_NAME.FORM_BUILDER_MAIL_HISTORY}
          </NavLink>
          {formData?.scope === "SCHOLARSHIP" && (
            <Dropdown
              menu={{
                items: items,
                selectable: true,
                selectedKeys: getSelectedKey().filter(
                  (key): key is string => key !== undefined,
                ),
              }}
              placement="bottomRight"
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space
                  className={`cursor-pointer ${
                    isDropdownActive
                      ? "text-primary"
                      : "text-gray-700 hover:text-primary"
                  }`}
                >
                  Quản lý học bổng
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          )}
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
